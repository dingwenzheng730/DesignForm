/**
 * Created by YuAng on 2016-11-22.
 */

var assert = require('chai').assert;
var req = require('request');
var expect = require('expect.js');

before(function(done){
    new User({
        "UserId": "MockAliceAlice",
        "Pwd": pwd,
        "NickName": "AliceXianYu",
        "Skills": ["EE"]
    }).save(function(err, doc){
        testUser = doc;
        new Project({
            "ProjectName": "Mock project",
            "Description": "abcdefg",
            "Subjects": ["EE", "CS"],
            "Status": 20,
            "Admin": testUser._id,
            "Member": [testUser._id],
            "Candidate": [testUser._id]
        }).save(function(err, doc){
            testProject = doc;
        });
    });
    done();
});
