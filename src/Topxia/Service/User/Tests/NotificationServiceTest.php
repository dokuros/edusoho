<?php

namespace Topxia\Service\User\Tests;

use Topxia\Service\Common\BaseTestCase;
use Topxia\Service\User\NotificationService;
use Topxia\Service\User\UserService;
use Topxia\Common\ArrayToolkit;

class NotificationServiceTest extends BaseTestCase
{

    public function testAddNotification()
    {
        $user = $this->createUser();
        $this->getNotificationService()->notify($user['id'], "default", "content");
        $unreadNotificationNum = $this->getUserService()->getUnreadNotificationNum($user['id']);
        $this->assertEquals(1,$unreadNotificationNum);

        $notificationsNum = $notifications = $this->getNotificationService()->getUserNotificationCount($user['id']);
        $this->assertEquals(1,$notificationsNum);
    }

    public function testListUserNotifications()
    {
        
        $user = $this->createUser();
        $this->getNotificationService()->notify($user['id'], "default", "content");
        $this->getNotificationService()->notify($user['id'], "default", "content");
        $unreadNotificationNum = $this->getUserService()->getUnreadNotificationNum($user['id']);
        $this->assertEquals(2,$unreadNotificationNum);

        $notificationsNum = $notifications = $this->getNotificationService()->getUserNotificationCount($user['id']);
        $this->assertEquals(2,$notificationsNum);

        $notifications = $this->getNotificationService()->findUserNotifications($user['id'], 0, 30);

        $this->assertEquals($user['id'], $notifications[0]['userId']);
        $this->assertEquals("default", $notifications[0]['type']);
        $this->assertEquals(1, $notifications[0]['isRead']);
        $this->assertEquals("content", $notifications[0]['content']['message']);

        $this->assertEquals($user['id'], $notifications[1]['userId']);
        $this->assertEquals("default", $notifications[1]['type']);
        $this->assertEquals(1, $notifications[1]['isRead']);
        $this->assertEquals("content", $notifications[1]['content']['message']);

        $unreadNotificationNum = $this->getUserService()->getUnreadNotificationNum($user['id']);
        $this->assertEquals(2,$unreadNotificationNum);
    }

    private function createUser()
    {
        $user = array();
        $user['email'] = "user@user.com";
        $user['nickname'] = "user";
        $user['password']= "user";
        return $this->getUserService()->register($user);
    }

    private function getUserService(){
    return $this->getServiceKernel()->createService('User.UserService');
    }

    private function getNotificationService(){
    return $this->getServiceKernel()->createService('User.NotificationService');
    }

}