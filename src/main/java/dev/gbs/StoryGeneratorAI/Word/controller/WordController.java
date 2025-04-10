package dev.gbs.StoryGeneratorAI.Word.controller;

import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import dev.gbs.StoryGeneratorAI.Word.service.WordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word")
public class WordController {
    //Injeção de Dependência da Service
    private final WordService service;

    public WordController(WordService service) {
        this.service = service;
    }

    //criar uma word - POST
    @PostMapping("/create")
    public ResponseEntity<WordModel> create(@RequestBody WordModel word){
        WordModel save = service.create(word);
        return ResponseEntity.ok(save);
    }

    //acessar todas as word's - GET
    @GetMapping("/print/all")
    public ResponseEntity<List<WordModel>> printAll(){
        List<WordModel> list = service.printAll();
        return ResponseEntity.ok(list);
    }

    //acessar uma word - GET
    @GetMapping("/print/{id}")
    public ResponseEntity<WordModel> printById(@PathVariable Long id){
        WordModel wordModel = service.printbyId(id);
        return ResponseEntity.ok(wordModel);
    }

    //atualizar uma word - UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<WordModel> update(@PathVariable Long id, @RequestBody WordModel body){
        WordModel wordModel = service.update(id, body);
        return ResponseEntity.ok(wordModel);
    }

    //deletar uma word - DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.ok("Palavra id: " + id + "deletada com sucesso");
    }
}
