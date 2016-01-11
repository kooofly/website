var uri = 'https://api.github.com/repos/kooofly/website/'
export default {
    article_list_url: uri + 'issues?filter=created&labels=blog',
    article_url: uri + 'issues/',
    words_index_url: uri + 'issues?filter=created&page=1&per_page=5&labels=words',
    words_list_url: uri + 'issues?filter=created&page=1&per_page=5&labels=words',
    nav_labels_url: uri + 'labels',
    client: {
        client_id: '5860bc4f31616f032986',
        client_secret: '37029f0f806951dc41523c78eeeff48b22f81404'
    }
}