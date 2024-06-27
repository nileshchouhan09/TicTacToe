import {FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
const App = (): JSX.Element => {
  const [isCross, setisCross] = useState<boolean>(false);
  const [winner, setwinner] = useState('');
  const [gameState, setgameState] = useState(new Array(9).fill('empty', 0, 9));

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setwinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setwinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setwinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setwinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setwinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setwinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setwinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setwinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setwinner('Draw game... ⌛️');
    }
  }

  const reloadGame = () => {
    setgameState(new Array(9).fill('empty', 0, 9));
    setwinner('');
    setisCross(false);
  };

  const handleClick = (itemNumber: number) => {
    if (winner !== '') {
      Snackbar.show({
        text: 'Game Over',
        backgroundColor: '#000',
        textColor: '#fff',
      });
      reloadGame();
    }
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setisCross(!isCross);
      checkIsWinner();
    } else {
      Snackbar.show({
        text: 'Invalid Move',
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }
  };
  return (
    <SafeAreaView>
      <StatusBar />

      {winner ? (<View style= {[styles.playerInfo, styles.winnerInfo]}>
        <Text style = {styles.winnerTxt}>{winner}</Text>
      </View>) :( <View style={[styles.playerInfo, isCross ? styles.xTurn : styles.oTurn]}>
        <Text style = {styles.heading}>Player {isCross ? "X" : "O"}'s turn </Text>
      </View>)}



      <FlatList
      numColumns={3}
      data={gameState}
      style={[styles.grid]}
      renderItem={({item, index}) => (
        <Pressable key={index}
        style ={styles.card}
        onPress={()=>(handleClick(index))}
        >
          <Icons name={item}/>
        </Pressable>
      )}
      />

      <Pressable style={styles.gameBtn} onPress={()=>reloadGame()}> 

        <Text style={styles.gameBtnText}>
         {winner? "start new game" : "Relaod the game"} 
        </Text>
      
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  heading:{
    fontSize:17,
    fontWeight:'bold'
  },
  playerInfo:{
    margin:10,
    padding:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',

    shadowOffset:{
      width:1,
      height:1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    
  },
  winnerInfo:{
    borderRadius:8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt:{
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  xTurn :{
    backgroundColor:"#1be38c"
  },
  oTurn:{
    backgroundColor:"#f0d400"
  },
  grid:{
    margin:12,
  },
 card:{
  
    height:100,
    width:"33.33%",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:"#333",
    
 },
 gameBtn: {
  alignItems: 'center',

  padding: 10,
  borderRadius: 8,
  marginHorizontal: 36,
  backgroundColor: '#8D3DAF',
},
gameBtnText: {
  fontSize: 18,
  color: '#FFFFFF',
  fontWeight: '500',
},
});
