(() => {
    const BASE_URL = 'https://fe.it-academy.by/Examples/words_tree';
    const ROOT = 'root.txt';

    function unfoldWordsTree(filename) {
        return fetch(`${BASE_URL}/${filename}`)
            .then(function (response) {
                return response.text();
            })
            // either unfold JSON or return text
            .then(handleTextResponse)
            // do nothing if we failed to fetch for some reason
            .catch(function (e) {
                console.log('Ignoring the unfetched file...', e)
            });
    };

    function handleTextResponse(text) {
        try {
            // attempt to parse as JSON
            const json = JSON.parse(text);
            // if it's a JSON array, recursively unfold for each resource
            return Promise
                .all(json.map(unfoldWordsTree))
                .then(function (stringList) {
                    return stringList.filter(element => !!element).join(' ');
                });
        } catch (e) {
            return Promise.resolve(text);
        }
    }

    unfoldWordsTree(ROOT).then(function (result) {
        console.log(result);

        document.getElementById('promise').innerHTML = result;
    });
})();
