package dev.gbs.StoryGeneratorAI.Story.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.gbs.StoryGeneratorAI.Common.Enums.Genre;
import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "tb_story")
public class StoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;

    @JsonIgnore
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "word_list")
    private List<WordModel> wordList;
}
