import * as React from "react";
import { SEARCH_STRING_MINIMUM } from './../../common/constants';

let searchResults = [];
let searchString = '';
class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearchResultClick(item) {
        console.log(`Clicked ${item.name}`);
        // Take the user to the product page of item clicked
    }

    styleSearchResultString(resultData) {
        let resultDiv;
        if (resultData.toLowerCase().includes(this.props.searchString.toLowerCase())) {
            let markedChars = resultData.replace(new RegExp(this.props.searchString.toLowerCase(), "gi"), (match) => `<mark>${match}</mark>`);
            resultDiv = <span dangerouslySetInnerHTML={{__html: markedChars}}></span>
        }
        else {
            resultDiv = resultData;
        }

        return resultDiv
    }
    
    render() {
        return (
        <div className="search-result__container">
            { this.props.searchResults.map((result, i) =>
                <div className="search-result__result" onClick={(e) => this.handleSearchResultClick(result)} key={result._id}>
                    <img className="search-result__image" src={result.picture} alt={result.about}></img>
                    <div className="search-result__name">{this.styleSearchResultString(result.name)}</div>
                    <div className="search-result__price">${result.price}</div>
                    <div className="search-result__tags">
                        { result.tags.map((tag, index) =>
                            <span className="search-result__tag">{tag}</span>
                        )}
                    </div>
                    <div className="search-result__about">{this.styleSearchResultString(result.about)}</div>
                </div>
            )}
        </div>
        );
    }
}

export default SearchResults;