
async function isAdmin(req, res, next){
    try {
      
        if(req.session.userId && req.session.isAdmin){
            next();
        } else{
            res.render('homepage', {error: "Admin only"});
        }

    } catch (error) {
        console.log("Error in the authMiddleware", error)
    }
}


module.exports = isAdmin ;