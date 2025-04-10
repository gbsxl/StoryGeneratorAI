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
        Optional<StoryModel> optionalStory = repository.findById(id);
        if(optionalStory.isPresent()){
            return optionalStory.orElse(null);
        }
        return null;
    }

    //acessar words da Story
    public List<WordModel> printWords(Long id){
        Optional<StoryModel> optionalStory = repository.findById(id);
        return optionalStory.map(StoryModel::getWordList).orElse(null);
    }

    //atualizar uma word
    public StoryModel update(Long id, StoryModel storyBody){
        Optional<StoryModel> optionalStory = repository.findById(id);
        if(optionalStory.isPresent()){
            StoryModel original = optionalStory.get();

            original.setGenre(storyBody.getGenre());
            original.setWordList(storyBody.getWordList());

            return repository.save(original);
        }
        throw new EntityNotFoundException("Story not found with id: " + id);
    }

    //deletar uma word
    public void delete(Long id){
        if(repository.findById(id).isPresent()){
            repository.deleteById(id);
        }
    }
}
