module.exports.isLoggedIn=  (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        console.log(req.session)
        req.flash('error','Need to Login first!')
        return res.redirect('/login')
    }
    next();

}