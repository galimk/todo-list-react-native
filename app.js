import React, {Component} from "react";
import {View, Text, StyleSheet, Platform, ListView, Keyboard} from "react-native";
import Header from "./header";
import Footer from "./footer";
import Row from './row';
import listStore from './listStore';

class App extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return true;
            }
        });

        this.state = {
            allComplete: false,
            value: "",
            items: [],
            dataSource: ds.cloneWithRows([])
        };

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
        this.setSource = this.setSource.bind(this);
        this.markCompleted = this.markCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        listStore.loadList((result) => {
            this.setState({
                items: result,
                dataSource: this.state.dataSource.cloneWithRows(result)
            });
        });
    }

    handleAddItem() {
        if (!this.state.value) return;

        const newItems = [
            {
                id: Date.now(),
                text: this.state.value,
                complete: false
            },
            ...this.state.items
        ];

        this.setSource(newItems, newItems, {value: ""});
    }

    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ... item, complete
        }));
        this.setSource(newItems, newItems, {allComplete: complete});
    }

    setSource(items, itemsDataSource, otherState = {}) {
        listStore.saveList(items, () => {
            this.setState({
                items,
                dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
                ...otherState
            });
        });
    }

    markCompleted(id) {
        console.log(`marking ${id}`);
        let newItems = [...this.state.items];
        let item = newItems.find(e => e.id == id);
        item.complete = !item.complete;
        this.setSource(newItems, newItems);
    }

    deleteItem(id) {
        console.log(`deleting ${id}`);
        let newItems = this.state.items.filter(e => e.id != id);
        this.setSource(newItems, newItems);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    onChange={(value) => this.setState({value})}
                    onToggleAllComplete={this.handleToggleAllComplete}
                />

                <View style={styles.content}>
                    <ListView
                        style={styles.list}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        onScroll={() => Keyboard.dismiss()}
                        renderRow={({key, ...value}) => {
                            return (
                                <Row
                                    key={key}
                                    {... value}
                                    onDelete={this.deleteItem}
                                    onMarkCompleted={this.markCompleted}
                                />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return <View key={rowId} style={styles.separator} />
                        }}
                    />
                </View>

                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        ...Platform.select({
            ios: {
                paddingTop: 30
            }
        })
    },
    content: {
        flex: 1
    },
    list: {
        backgroundColor: "#FFF"
    },
    separator: {
        borderWidth: 1,
        borderColor: "#f5f5f5"
    }
});

export default  App;
