package dev.gbs.StoryGeneratorAI.Story.service;

import dev.gbs.StoryGeneratorAI.Story.model.StoryModel;
import dev.gbs.StoryGeneratorAI.Story.repository.StoryRepository;
import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoryService {
    private final StoryRepository repository;

    public StoryService(StoryRepository repository) {
        this.repository = repository;
    }

    //criar uma word
    public StoryModel create(StoryModel story){
        return repository.save(story);
    }

    //acessar todas as words
    public List<StoryModel> printAll(){
        return repository.findAll();
    }

    //acessar word por id
    public StoryModel printbyId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("História não encontrada"));
    }

    //acessar words da Story
    public List<WordModel> printWords(Long id){
        Optional<StoryModel> optionalStory = repository.findById(id);
        return optionalStory.map(StoryModel::getWordList).orElse(null);
    }

    public List<String> describeById(Long id){
        if(repository.findById(id).isPresent()) {
            return repository.findById(id).get().getWordList().stream()
                    .map(word -> String.format("palavra: %s, tipo: %s", word.getText(), word.getType().toString()))
                    .toList();
        }
        return null;
    }

    //atualizar uma word
    public StoryModel update(Long id, StoryModel storyBody){
            StoryModel original = repository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("História não encontrada"));

            original.setGenre(storyBody.getGenre());
            original.setWordList(storyBody.getWordList());

            return repository.save(original);
    }

    //deletar uma word
    public void delete(Long id){
        if(repository.findById(id).isPresent()){
            repository.deleteById(id);
        }
    }
}
