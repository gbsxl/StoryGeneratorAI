package dev.gbs.StoryGeneratorAI.StoryPrompt.service;

import dev.gbs.StoryGeneratorAI.Story.model.StoryModel;
import dev.gbs.StoryGeneratorAI.Story.service.StoryService;
import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class StoryPromptService {
    private final WebClient webClient;
    private final String apiKey = System.getenv("GPT_API_KEY");
    private final StoryService service;

    public StoryPromptService(WebClient.Builder builder, StoryService service) {
        this.webClient = builder
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
        this.service = service;
    }

    public Mono<String> generatePrompt(Long id) {
        StoryModel story = service.printbyId(id);

        String prompt = "Você é um grande contador de histórias, muito criativo, cria histórias espetaculares, com finais inesperados, personagens cativantes, objetos e armas sensacionais, Crie uma história com os seguintes elementos:" +
                "História:\nTítulo: " + story.getTitle() + "\nGênero: " + story.getGenre() + "\nLista de elementos: " + service.describeById(id);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/gemini-2.0-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build()
                )
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                    if (candidates != null && !candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            return parts.get(0).get("text").toString();
                        }
                    }
                    return "nenhuma resposta gerada pelo Gemini";
                });
    }

}