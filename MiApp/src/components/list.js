import React, {useState, useEffect} from "react";
import {FlatList, SafeAreaView, Text, TouchableOpacity, StyleSheet, useColorScheme, View} from "react-native";
import Location from "../models/location";
import {Colors} from "react-native/Libraries/NewAppScreen";
import ItemSeparator from "./item-separator";
import {environment} from "../environments/environments";
import Authorization  from "../utils/Authorization";
import Loading from "./Loading";


const List = () => {
    const isDarkMode = useColorScheme() ===
        "dark";
    const textStyle = {
        color: isDarkMode ? Colors.lighter :
            Colors.darker,
    };
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        setLoading(true);
        setLocations([])
        fetch(environment.baseURL + "api/locations", Authorization)
            .then(res => res.json())
            .then(data => {
                let locations = data?.map(l => new Location(l));
                setLocations(locations);
                setLoading(false);
            }).catch(e => {
            setLoading(false);
        });
    }
    const handleRefresh = () => {
        loadData();
    };



   /* const locations: Location[] = [
        new Location({
            id: 1, name: "Viedma", contact: "2920553263",
            linkInfo: "link info", latitude: 23.34,
            longitude: 23.4,
        }),
        new Location({
            id: 2, name: "Carmen de patagones", contact:
                "292054325232",
            linkInfo: "link info patagones", latitude:
                23.34, longitude: 23.4,
        }),
    ];*/

    const renderitemComponent = (info) =>
        <TouchableOpacity style={styles.container}>
            <Text style={[textStyle,
                styles.textTitle]}>{info.item.name}</Text>
            <Text style={[textStyle,
                styles.text]}>{info.item.contact}</Text>
        </TouchableOpacity>;
    return (
        <SafeAreaView>
            <Loading isVisible={loading} />

            <FlatList data={locations}
                      renderItem={info => renderitemComponent(info)}
                      keyExtractor={location => location.id}
                      ItemSeparatorComponent={() => (<ItemSeparator/>)}
            />
        </SafeAreaView>
    );



};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "center",
        padding: 5,
        backgroundColor:'#f9c2ff',
    },
    text: {
        textAlign: "justify",
    },
    textTitle: {
        padding: 5,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});



export default List;
