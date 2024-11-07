package com.campuscollege.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campuscollege.dto.UserDto;
import com.campuscollege.dto.mapper.UserDtoMapper;
import com.campuscollege.exception.UserException;
import com.campuscollege.model.User;
import com.campuscollege.service.UserService;
import com.campuscollege.util.UserUtil;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReqUser(true); // Assuming this is always the request user's profile
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId,
                                               @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(userId);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReqUser(UserUtil.isReqUser(reqUser, user));
        userDto.setFollowed(UserUtil.isFollowedReqUser(reqUser, user)); // Corrected method name
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query,
                                                    @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfileByJwt(jwt);
        
        List<User> users = userService.searchUser(query);
        List<UserDto> userDtos = UserDtoMapper.toUserDtos(users);
        
        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUserProfile(@RequestBody User req,
                                                      @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfileByJwt(jwt);
        
        User updatedUser = userService.updateUserProfile(reqUser.getId(), req);   
        UserDto userDto = UserDtoMapper.toUserDto(updatedUser);
        
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser(@PathVariable Long userId,
                                              @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfileByJwt(jwt);
        
        User user = userService.followUser(userId, reqUser);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        
        userDto.setFollowed(UserUtil.isFollowedReqUser(reqUser, user));
        
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserDto>> getFollowers(@PathVariable Long userId,
                                                       @RequestHeader("Authorization") String jwt) throws UserException {
        System.out.println("Fetching followers for userId " + userId); // Debug log
        User reqUser = userService.findUserProfileByJwt(jwt);
        List<User> followers = userService.getFollowers(userId);
        List<UserDto> followerDtos = UserDtoMapper.toUserDtos(followers);

        return new ResponseEntity<>(followerDtos, HttpStatus.OK);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserDto>> getFollowing(@PathVariable Long userId,
                                                       @RequestHeader("Authorization") String jwt) throws UserException {
        System.out.println("Fetching following for userId: " + userId); // Debug log
        User reqUser = userService.findUserProfileByJwt(jwt);
        List<User> following = userService.getFollowing(userId);
        List<UserDto> followingDtos = UserDtoMapper.toUserDtos(following);

        return new ResponseEntity<>(followingDtos, HttpStatus.OK);
    }


    @PutMapping("/{userId}/unfollow")
    public ResponseEntity<UserDto> unfollowUser(@PathVariable Long userId,
                                                @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfileByJwt(jwt);
        
        User user = userService.unfollowUser(userId, reqUser);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        
        userDto.setFollowed(UserUtil.isFollowedReqUser(reqUser, user));
        
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
}


