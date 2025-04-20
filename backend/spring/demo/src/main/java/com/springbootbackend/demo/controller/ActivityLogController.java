package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.dto.ActivityLogDto;
import com.springbootbackend.demo.model.ActivityLog;
import com.springbootbackend.demo.repository.ActivityLogRepo;
import com.springbootbackend.demo.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("activity")
@RestController
public class ActivityLogController {
@Autowired
ActivityLogService activityLogService;

@Autowired
    ActivityLogRepo activityLogRepo;
    @PostMapping("/log")
    public ActivityLog saveActivity(@RequestBody ActivityLogDto dto) {
        return activityLogService.saveActivity(dto);
    }


    @GetMapping("/user/{userId}")
    public List<ActivityLog> getUserActivities(@PathVariable String userId) {
      return activityLogRepo.findByUserId_Id(userId);
    }
}
