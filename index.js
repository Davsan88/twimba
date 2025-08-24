import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function () {
    console.log(tweetInput.value)
})

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }

    if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
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