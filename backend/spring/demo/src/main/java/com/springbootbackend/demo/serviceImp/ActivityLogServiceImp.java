package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.dto.ActivityLogDto;
import com.springbootbackend.demo.model.ActivityLog;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ActivityLogRepo;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ActivityLogServiceImp implements ActivityLogService {
@Autowired
UserRepo userRepo;
@Autowired
    ActivityLogRepo activityLogRepo;
    @Override
    public ActivityLog saveActivity(ActivityLogDto dto) {
        UserModel user = userRepo.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        ActivityLog activity = new ActivityLog();
        activity.setUserId(user);
        activity.setType(dto.getType());
        activity.setActivityName(dto.getActivityName());
        activity.setScore(dto.getScore());
        activity.setTimestamp(dto.getTimestamp() != null ? dto.getTimestamp() : new Date());

        return activityLogRepo.save(activity);
    }
}
