package dev.gbs.StoryGeneratorAI.Word.controller;

import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import dev.gbs.StoryGeneratorAI.Word.service.WordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word")
public class WordController {
    //Injeção de Dependência da Service
    WordService service;
    public WordController(WordService service) {
        this.service = service;
    }

    //criar uma word - POST
    @PostMapping("/create")
    public WordModel create(@RequestBody WordModel word){
        return service.create(word);
    }

    //acessar todas as word's - GET
    @GetMapping("/print/all")
    public List<WordModel> printAll(){
        return service.printAll();
    }

    //acessar uma word - GET
    @GetMapping("/print/{id}")
    public WordModel printById(@PathVariable Long id){
        return service.printbyId(id);
    }

    //atualizar uma word - UPDATE
    @PutMapping("/update/{id}")
    public WordModel update(@PathVariable Long id, @RequestBody WordModel body){
        return service.update(id, body);
    }

    //deletar uma word - DELETE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
