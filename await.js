(async () => {
    const BASE_URL = 'https://fe.it-academy.by/Examples/words_tree';
    const ROOT = 'root.txt';

    const unfoldWordsTree = async (filename) => {
        try {
            const response = await fetch(`${BASE_URL}/${filename}`);
            const text = await response.text();
            // either unfold JSON or return text
            return handleTextResponse(text);
        } catch (e) {
            // do nothing if we failed to fetch for some reason
            console.log('Ignoring the unfetched file...', e);
        }
    }

    const handleTextResponse = async (text) => {
        try {
            // attempt to parse as JSON
            const json = JSON.parse(text);
            // if it's a JSON array, recursively unfold for each resource
            const stringList = await Promise.all(json.map(unfoldWordsTree));
            return stringList.filter(element => !!element).join(' ');
        } catch (e) {
            return text;
        }
    }

    const result = await unfoldWordsTree(ROOT);

    console.log(result);

    document.getElementById('await').innerHTML = result;
})();