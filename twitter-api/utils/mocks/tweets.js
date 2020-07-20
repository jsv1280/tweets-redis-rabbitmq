const tweetMocks = [
    {
        data: {
            id: '123',
            created_at: '2020-07-02',
            text: 'node js tweet',
            author_id: '4545451',
            referenced_tweets: [
                { id: '3334343434' }
            ],
            format :'compact'
        },
        matching_rules : [
            { id: '123'}
        ]
       
    },
    {
        data: {
            id: '1234',
            created_at: '2020-07-01',
            text: 'platzi tweet',
            author_id: '4554521',
            referenced_tweets: [
                { id: '3443' }
            ],
            format :'compact'
        },
        matching_rules : [
            { id: '123323'}
        ]
    },
    {
        data: {
            id: '123545',
            created_at: '2020-05-01',
            text: 'open source tweet',
            author_id: '4545451343',
            referenced_tweets: [
                { id: '565656' }
            ],
            format :'compact'
        },
        matching_rules : [
            { id: 'fddffddf'}
        ]
    }
]

class TweetServiceMock {
    async getTweets() {
      return Promise.resolve(tweetMocks);
    }
  
}

module.exports = {
    tweetMocks,
    TweetServiceMock
} 