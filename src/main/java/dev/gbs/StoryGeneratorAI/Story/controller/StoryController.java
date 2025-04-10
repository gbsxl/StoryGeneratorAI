package dev.gbs.StoryGeneratorAI.Story.controller;

import dev.gbs.StoryGeneratorAI.Story.model.StoryModel;
import dev.gbs.StoryGeneratorAI.Story.service.StoryService;
import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/story")
public class StoryController {
    private final StoryService service;

    public StoryController(StoryService service) {
        this.service = service;
    }

    //criar uma word - POST
    @PostMapping("/create")
    public ResponseEntity<StoryModel> create(@RequestBody StoryModel story){
        StoryModel storyModel = service.create(story);
        return ResponseEntity.ok(story);
    }

    //acessar todas as word's - GET
    @GetMapping("/print/all")
    public ResponseEntity<List<StoryModel>> printAll(){
        List<StoryModel> list = service.printAll();
        return ResponseEntity.ok(list);
    }

    //acessar uma word - GET
    @GetMapping("/print/{id}")
    public ResponseEntity<StoryModel> printById(@PathVariable Long id){
       StoryModel storyModel = service.printbyId(id);
       return ResponseEntity.ok(storyModel);
    }

    //acessar words de uma story - GET
    @GetMapping("/print/{id}/words")
    public ResponseEntity<List<WordModel>> printWords(@PathVariable Long id){
        List<WordModel> list = service.printWords(id);
        return ResponseEntity.ok(list);
    }

    //atualizar uma word - UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<StoryModel> update(@PathVariable Long id, @RequestBody StoryModel body){
        StoryModel storyModel = service.update(id, body);
        return ResponseEntity.ok(storyModel);
    }

    //deletar uma word - DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.ok("História id: " + id + "deletada com sucesso");
    }

}
