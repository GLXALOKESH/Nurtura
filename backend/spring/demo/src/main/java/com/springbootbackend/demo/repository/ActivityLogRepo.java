package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepo extends MongoRepository<ActivityLog , String> {
    List<ActivityLog> findByUserId_Id(String userId);
}
