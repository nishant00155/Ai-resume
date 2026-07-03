const mongoose = require('mongoose');


/**
 * -job description: This model represents the interview report for a candidate.
 * -resume text
 * - self description
 * match score: number between 0 and 100
 * - technical questions
 *     [{
 *     question: "",
 *     intention: "",  
 *     answer: "",
 *   }]
 * - behavioral questions[{
 *    question: "",
 *     intention: "",  
 *     answer: "",
 * }]
 * - skill gaps :[{
 * skill: "",
 * serverity: "",
 * type: "",
 * enum:["low", "medium", "high"],
 * }]
 * - preparation plan:[{
 *   sday: "",
 *   focus: "",
 *   task: "",
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: string,
        required:true,
    },
    intention:{
        type:String,
        required:true,
    },
    answer:{
        type: String,
        required:true
    }
},{
    _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type: string,
        required:true,
    },
    intention:{
        type:String,
        required:true,
    },
    answer:{
        type: String,
        required:true
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: string,
        required:true,
    },
    severity:{
        type:String,
        enum:["low","medium",'high'],
        required:true,
    },
    
},{
    _id:false
})

const preprationPlanSchema = new mongoose.Schema({
    day:{
        type:  Number,
        required:true,
    },
    focus:{
        type:String,
        required:true,
    },
    task:{
        type: String,
        required:true
    }
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: true,
    },
    resume:{
        type: String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preprationPlan:[preprationPlanSchema]
},{
    timestamps: true
})