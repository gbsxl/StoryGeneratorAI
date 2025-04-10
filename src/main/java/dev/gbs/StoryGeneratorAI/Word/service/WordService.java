package dev.gbs.StoryGeneratorAI.Word.service;

import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import dev.gbs.StoryGeneratorAI.Word.repository.WordRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WordService {
    private final WordRepository repository;

    public WordService(WordRepository repository) {
        this.repository = repository;
    }

    //criar uma word
    public WordModel create(WordModel word){
        return repository.save(word);
    }

    //acessar todas as words
    public List<WordModel> printAll(){
        return repository.findAll();
    }

    //acessar word por id
    public WordModel printbyId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Palavra não encontrada, id: " +id));
    }

    //atualizar uma word
    public WordModel update(Long id, WordModel wordBody){
            WordModel original = repository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Palavra não encontrada"));

            original.setText(wordBody.getText());
            original.setType(wordBody.getType());
            original.setStory(wordBody.getStory());

           return repository.save(original);
    }

    //deletar uma word
    public void delete(Long id){
        if(repository.findById(id).isPresent()){
            repository.deleteById(id);
        }
    }
}
