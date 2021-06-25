const router = require('express').Router()
const username = 'shahul'
const password = '1234'
const Post = require('./Schema')

const checkAdmin = (req, res, next) => {
    console.log(req.session);
    if (req.session.Admin) next()
    else res.redirect('/admin/login')
}

router.get('/', checkAdmin, (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('compose', { posts: posts.reverse() })
    })
})

//login route 
router.get('/login', (req, res) => {
    res.render('login', { err: null })
})
router.post('/login', (req, res) => {
    let { uname, psw } = req.body
    if (uname === username && psw === password) {
        req.session.Admin = true
        res.redirect('/admin')
    }
    else res.render('login', { err: true })
})
// new post 
router.post('/compose', checkAdmin, (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });


    post.save(function (err) {
        if (!err) {
            res.redirect("/admin");
        }
    });

})

//delete posts 
router.get('/delete/:id', checkAdmin, (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (!err) res.redirect('/admin')
    })
})
// edit post 
router.get('/edit/:id', checkAdmin, (req, res) => {
    Post.findOne({ _id: req.params.id }, (err, post) => {
        !err && res.render('edit', { post })
    })
})
router.post('/edit', checkAdmin, (req, res) => {
    const { id, title, content } = req.body
    Post.findOneAndUpdate({ _id: id }, { title, content }, (err, newPost) => {
        res.redirect('/admin')
    })
})
module.exports = router;