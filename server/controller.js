
module.exports = {
    getPosts: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {bool} = req.params;
        const {search} = req.query;
        let posts = [];
        // console.log(search, bool)

        if(bool === 'true'){
            posts = await db.get_posts();
        }
        else{
            posts = await db.get_posts_without_user(user_id)
        }
        
        if(search) {
            const filteredPosts = posts.filter( el =>{
                return el.title.toLowerCase().includes(search.toLowerCase())
            })
            return res.status(200).send(filteredPosts)
        }

        res.status(200).send(posts);
    },
    getAllPost: async (req, res) => {
        const db = req.app.get('db');
        db.get_posts()
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log(err))
        
        // assign to a variable option
        // getAllPost: async (req, res) => {
            // const db = req.app.get('db');
            // const posts = await db.get_posts();
            // return res.status(200).send(posts)
        // }
    },
    getSinglePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const post = await db.get_single_post(id)
        // console.log(post)
        res.status(200).send(post[0])
        // db.get_single_post(id)
        // .then(post => res.status(200).send(post))
        // .catch(err => console.log(err))
    },
    createPost: async(req, res) => {
        const db = req.app.get('db');
        const {title, img, content, user_id} = req.body;
        // const {user_id} = req.session.user;
        console.log(user_id)
        const post = await db.create_post(title, img, content, user_id);
        // console.log([post])
        // if(!post[0]){
        //     return res.status(409).send('error')
        // } 
        res.status(200).send(post[0])
    },
    deletePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        // const [post] = await 
        db.delete_post(id);
        res.status(200).send('Delete successful');
    }
    
}