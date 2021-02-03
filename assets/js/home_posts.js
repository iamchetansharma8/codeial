{
    // function to send data to controller function
    // to submit data
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                // converts form data to json
                data:newPostForm.serialize(), 
                success: function (data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));

                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
        
         ${post.content} 
        <br>
         ${post.user.name}
         <small>
                            
         <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
             0 Likes
         </a>
     
         </small>
            <div class="post-comments-form">
                <form action="/comments/create" method="POST" id="${post._id}-comment-form">
                    <input type="text" name="content" placeholder="Add a Comment.....">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
            </div>
        
         <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
         </div>
        </li>`);
    }

    // method to delete a post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let convertPostToAjax=function(){
        $('#posts-container>ul>li').each(function(){
            let self=$(this);
            let deleteButton=$(' .delete-post-button',self);
            deletePost(deleteButton);

            // get post id
            let postId=self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
    createPost();
    convertPostToAjax();
}