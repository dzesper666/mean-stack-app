import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from "../posts.service";
import { Subscription } from 'rxjs';
import { PageEvent } from "@angular/material";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

    constructor(public postService: PostService, private authService: AuthService) { }

    posts: Post[] = [];
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 5;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    private postSubscription: Subscription;
    private authStatusSubscription: Subscription;
    userIsAuthenticated = false;
    userId: string;

    ngOnInit() {
        this.isLoading = true;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postSubscription = this.postService.postUpdateListener()
            .subscribe((postData: { posts: Post[], postCount: number }) => {
                this.isLoading = false;
                this.totalPosts = postData.postCount;
                this.posts = postData.posts;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSubscription = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postService.deletePost(postId).subscribe(() => {
            this.postService.getPosts(this.postsPerPage, this.currentPage);
        }, () => {
           this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
        this.authStatusSubscription.unsubscribe();
    }

}
