package com.springbootbackend.demo.service;

import com.springbootbackend.demo.dto.ActivityLogDto;
import com.springbootbackend.demo.model.ActivityLog;

public interface ActivityLogService {
   public ActivityLog saveActivity(ActivityLogDto dto);
}
