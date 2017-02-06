import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Swipeout from 'react-native-swipe-out';

class Row extends Component {
    constructor(props) {
        super(props);

        this.swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: this.removePressed.bind(this)
            }
        ];
     }

    removePressed() {
        this.props.onDelete(this.props.id);
    }

    render() {
        let touchableStyle = styles.toggleIcon;
        let labelStyle = styles.label;
        if (this.props.complete) {
            touchableStyle = styles.toggleSelected;
            labelStyle = styles.labelComplete;
        }

        return (
            <Swipeout right={this.swipeoutBtns} backgroundColor="white">
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.props.onMarkCompleted(this.props.id)}>
                        <Text style={touchableStyle}>{String.fromCharCode(10003)}</Text>
                    </TouchableOpacity>

                    <Text style={labelStyle}>{this.props.text}</Text>
                </View>
            </Swipeout>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 50,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    toggleIcon: {
        fontSize: 30,
        marginLeft: 15,
        color: "#CCCCCC"
    },
    label: {
        fontSize: 20,
        marginLeft: 15
    },
    labelComplete: {
        fontSize: 20,
        marginLeft: 15,
        textDecorationLine: 'line-through'
    },
    toggleSelected: {
        fontSize: 30,
        marginLeft: 15,
        color: "green"
    }
});

export default Row;
