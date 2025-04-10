package dev.gbs.StoryGeneratorAI.Story.repository;

import dev.gbs.StoryGeneratorAI.Story.model.StoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends JpaRepository<StoryModel, Long> {
}
