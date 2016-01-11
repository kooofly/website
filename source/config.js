var uri = 'https://api.github.com/repos/kooofly/website/' //https://api.github.com/repositories/1207821/
export default {
    article_list_url: uri + 'issues?filter=created&labels=blog',
    article_url: uri + 'issues/',
    words_index_url: uri + 'issues?filter=created&page=1&per_page=5&labels=words',
    words_list_url: uri + 'issues?filter=created&page=1&per_page=5&labels=words',
    nav_labels_url: uri + 'labels'
}