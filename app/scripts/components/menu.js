/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import { SEARCH_STRING_MINIMUM } from '../../common/constants';
import SearchResults from './search-results';

/**
 * Main constructor for the Menu Class
 * @memberof Menu
 */
    class Menu extends React.Component {
        constructor() {
            super();
            this.state = {
                showingSearch: false,
                searchResults: [],
                searchString: '',
                tags: [],
                selectedTags: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            resultDiv: ""
        });
        // Get tags for filter
        if ( ! this.state.showingSearch ) {
            fetch(`http://localhost:3035`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ tags: data.data });
                });
        }
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        // Start Here
        // ...
        const searchString = e.target.value;
        if (searchString.length >= SEARCH_STRING_MINIMUM) {
            this.setState({searchString: searchString})
            fetch(`http://localhost:3035?resultString=${searchString}&tags=${this.state.selectedTags}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ searchResults: data.data });
                });
        }
        else {
            this.setState({ searchResults: [] })
        }
        
    }

    setSelectedTag(e) {
        const tag = e.tag.target;
        if (this.state.selectedTags?.includes(tag.innerText)) {
            this.setState({ 
                selectedTags: this.state.selectedTags.filter(item => item !== tag.innerText)
            });
            tag.className = 'menu__tag';
        }
        else {
            this.setState({
                selectedTags: [...this.state.selectedTags, ...[tag.innerText]]
            })
            tag.className = 'menu__tag--selected';
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        if (this.state.searchResults?.length > 0) {
            this.resultDiv = <SearchResults searchString={this.state.searchString} searchResults={this.state.searchResults} onClick={this.handleSearchResultClick} />;
        } else {
            this.resultDiv = <div></div>;
        }
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <div className="menu__tags">
                        Filter by tag:
                        { this.state.tags?.map((tag, index) =>
                            <span
                                key={tag}
                                onClick={(tag) => this.setSelectedTag({tag})}
                                className="menu__tag"
                                >
                                    {tag}
                                </span>
                        )}
                    </div>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {this.resultDiv}
                </div>
            </header>
        );
    }


}

// Export out the React Component
export default Menu;