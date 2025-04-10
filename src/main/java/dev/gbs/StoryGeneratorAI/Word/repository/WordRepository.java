package dev.gbs.StoryGeneratorAI.Word.repository;

import dev.gbs.StoryGeneratorAI.Word.model.WordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<WordModel, Long> {
}
