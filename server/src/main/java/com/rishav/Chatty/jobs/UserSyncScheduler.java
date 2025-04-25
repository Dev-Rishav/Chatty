package com.rishav.Chatty.jobs;

import com.rishav.Chatty.services.UserSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class UserSyncScheduler {

    @Autowired
    private UserSyncService userSyncService;

    // Runs every 10 minutes
    @Scheduled(cron = "0 * * * * *")
    public void scheduledUserSync() {
        System.out.println("🔄 Starting user sync to Redis...");
        userSyncService.syncUsersToRedis();
    }
}

