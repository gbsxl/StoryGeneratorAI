package dev.gbs.StoryGeneratorAI.StoryPrompt.controller;

import dev.gbs.StoryGeneratorAI.StoryPrompt.service.StoryPromptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class StoryPromptController {
    private final StoryPromptService promptService;

    public StoryPromptController(StoryPromptService promptService) {
        this.promptService = promptService;
    }

    @GetMapping("/generate{id}")
    public Mono<ResponseEntity<String>> generateStoryPrompt(@PathVariable Long id){
        return promptService.generatePrompt(id)
            .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
