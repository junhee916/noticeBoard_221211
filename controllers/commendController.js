const commendModel = require('../models/commend');
const commendController = {}

commendController.get = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findById(id)
                                                .populate('user', ['email'])
                                                .populate('board', ['board'])
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendData : commend
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.save = async (req, res) => {
    const board = req.params.boardId;
    const newCommend = new commendModel({
        user : res.locals.user.id,
        board,
        commend : req.body.commend
    })
    try{
        if(res.locals.user){
            const commend = await newCommend.save()
            res.status(200).json({
                msg : "save commend",
                commendData :commend
            })
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}
commendController.update = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                                user : res.locals.user.id,
                                board : res.body.board,
                                commend : res.body.commend
                            }});
            if(!commend){   
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.delete = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id);
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}

module.exports = commendController;