package com.campuscollege.util;

import com.campuscollege.model.User;

public class UserUtil {

    /**
     * Checks if the provided user is the same as the requesting user.
     * 
     * @param reqUser The requesting user
     * @param user The user to compare with
     * @return true if the users are the same, false otherwise
     */
    public static boolean isReqUser(User reqUser, User user) {
        if (reqUser == null || user == null) {
            return false;
        }
        return reqUser.getId().equals(user.getId());
    }

    /**
     * Checks if the requesting user is following the specified user.
     * 
     * @param reqUser The requesting user
     * @param user The user to check if followed
     * @return true if the requesting user is following the specified user, false otherwise
     */
    public static boolean isFollowedReqUser(User reqUser, User user) {
        if (reqUser == null || user == null) {
            return false;
        }
        // Ensure that followers are not null
        if (user.getFollowers() == null) {
            return false;
        }
        return user.getFollowers().contains(reqUser);
    }
}
