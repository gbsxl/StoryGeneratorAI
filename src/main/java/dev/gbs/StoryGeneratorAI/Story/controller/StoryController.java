package dev.gbs.StoryGeneratorAI.Story.controller;

import dev.gbs.StoryGeneratorAI.Story.model.StoryModel;
import dev.gbs.StoryGeneratorAI.Story.service.StoryService;
import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
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
    public StoryModel create(@RequestBody StoryModel story){
        return service.create(story);
    }

    //acessar todas as word's - GET
    @GetMapping("/print/all")
    public List<StoryModel> printAll(){
        return service.printAll();
    }

    //acessar uma word - GET
    @GetMapping("/print/{id}")
    public StoryModel printById(@PathVariable Long id){
        return service.printbyId(id);
    }

    //acessar words de uma story - GET
    @GetMapping("/print/{id}/words")
    public List<WordModel> printWords(@PathVariable Long id){
        return service.printWords(id);
    }

    //atualizar uma word - UPDATE
    @PutMapping("/update/{id}")
    public StoryModel update(@PathVariable Long id, @RequestBody StoryModel body){
        return service.update(id, body);
    }

    //deletar uma word - DELETE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

}
