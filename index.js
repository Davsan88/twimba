import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid@7.0.2'
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const tweetInput = document.getElementById('tweet-input')

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn')
        handleTweetBtnClick()
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweet.uuid === tweetId)

    targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++

    targetTweetObj.isLiked = !targetTweetObj.isLiked

    renderFeed()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweet.uuid === tweetId)

    targetTweetObj.isRetweeted ? targetTweetObj.retweets-- : targetTweetObj.retweets++

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    renderFeed()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {
    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }

    renderFeed()
}

function getFeedHtml() {
    let feedHtml = ``
    tweetsData.forEach((tweet) => {

        let likeIconClass = tweet.isLiked ? 'liked' : ''
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach((reply) => {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                
                `
            })
        }

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                           ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>   
        </div>
        `
    })
    return feedHtml
}

function renderFeed() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

renderFeed()