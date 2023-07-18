module.exports.isLoggedIn=  (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Need to Login first!')
        return res.redirect('/login')
    }
    next();

}