import React, { Component } from "react";
import { StyleSheet, View, TextInput, Platform, NativeEventEmitter, Pressable, Text, Button } from "react-native";
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-iflytek";
// Synthesizer 语音合成    // Recognizer 语音识别

export default class XfSDK extends Component {
  constructor(props) {
    super(props);

    Recognizer.init('57c7c5b0'); // 初始化iFlyTek语音识别引擎
    Synthesizer.init('57c7c5b0');  // 初始化语音合成

    this.state = {
      text: "",
      recordBtnText: "按住说话",
      answer: ''
    };

    this.onRecordStart = this.onRecordStart.bind(this);
    this.onRecordEnd = this.onRecordEnd.bind(this);
    this.onRecordCancel = this.onRecordCancel.bind(this);
    this.onRecognizerResult = this.onRecognizerResult.bind(this);
    this.onRecognizerError = this.onRecognizerError.bind(this);
    this.onRecognizerVolumeChanged = this.onRecognizerVolumeChanged.bind(this);
    this.onSyntheBtnPress = this.onSyntheBtnPress.bind(this);
    this.onIsSpeakingBtnPress = this.onIsSpeakingBtnPress.bind(this);
    this.onResumeBtnPress = this.onResumeBtnPress.bind(this);
  }

  componentDidMount() {
    this.recognizerEventEmitter = new NativeEventEmitter(Recognizer);
    this.recognizerEventEmitter.addListener('onRecognizerResult', this.onRecognizerResult)
    this.recognizerEventEmitter.addListener('onRecognizerError', this.onRecognizerError)
    this.recognizerEventEmitter.addListener('onRecognizerVolumeChanged', this.onRecognizerVolumeChanged)

    this.synthesizerEventEmitter = new NativeEventEmitter(Synthesizer);
    this.synthesizerEventEmitter.addListener('onSynthesizerSpeakCompletedEvent', this.onSynthesizerSpeakCompletedEvent);
    this.synthesizerEventEmitter.addListener('onSynthesizerBufferCompletedEvent', this.onSynthesizerBufferCompletedEvent);
  }

  componentWillUnmount() {
    this.recognizerEventEmitter.removeAllListeners('onRecognizerResult');
    this.recognizerEventEmitter.removeAllListeners('onRecognizerError');
    this.recognizerEventEmitter.removeAllListeners('onRecognizerVolumeChanged');
    this.synthesizerEventEmitter.removeAllListeners('onSynthesizerSpeakCompletedEvent');
    this.synthesizerEventEmitter.removeAllListeners('onSynthesizerBufferCompletedEvent');
  }

  // 处理回答
  handleAnswer = (result) => {
    let answer = ''
    if (result === '小智小智') {
      answer = '有什么可以帮您？'
    } else if (result === '今天天气如何？') {
      answer = '今天天气不错。'
    } else {
      answer = '抱歉，不明白你说什么'
    }
    this.setState({ answer, text: result },()=>{
      this.onSyntheBtnPress(answer)
    })
  }

  render() {
    const { answer, text } = this.state;
    return (
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        <Text style={{ marginBottom: 20 }}>我：{text}</Text>
        <Text style={{ marginBottom: 20 }}>小智：{answer}</Text>
        <Pressable
          containerStyle={styles.containerStyle}
          style={{ color: "white" }}
          onPress={this.onRecordEnd}
          onPressIn={this.onRecordStart}
          activeOpacity={0.8}
          onResponderTerminationRequest={() => true}
          onResponderTerminate={this.onRecordCancel}
        >
          {/* <Button title={this.state.recordBtnText} /> */}
          <Text style={styles.textBtn}>{this.state.recordBtnText}</Text>
        </Pressable>
        {/* <Pressable containerStyle={styles.containerStyle} style={{ color: "white" }} onPress={this.onSyntheBtnPress} activeOpacity={0.8}>
          <Text>按住说话</Text>
        </Pressable>
        <Pressable containerStyle={styles.containerStyle} style={{ color: "white" }} onPress={this.onIsSpeakingBtnPress} activeOpacity={0.8}>
          <Text>正在说话？</Text>
        </Pressable>
        <Pressable containerStyle={styles.containerStyle} style={{ color: "white" }} onPress={this.onPauseBtnPress} activeOpacity={0.8}>
          <Text>Pause</Text>
        </Pressable>
        <Pressable containerStyle={styles.containerStyle} style={{ color: "white" }} onPress={this.onResumeBtnPress} activeOpacity={0.8}>
          <Text>Resume</Text>
        </Pressable> */}
      </View>
    );
  }

  onRecordStart() {
    this.setState({ recordBtnText: "松开停止" });
    Recognizer.start();
  }

  onRecordEnd() {
    this.setState({ recordBtnText: "按住说话" });
    Recognizer.stop();
  }

  onRecordCancel(evt) {
    // setTimeout(() => {
    //   Recognizer.cancel();
    // }, 500);
  }

  onRecognizerResult(e) {
    console.log('e', e)
    if (!e.isLast) {
      return;
    }
    // this.setState({ text: e.result });
    this.handleAnswer(e.result)
  }

  onRecognizerError(result) {
    if (result.errorCode !== 0) {
      console.log(JSON.stringify(result));
    }
  }

  onRecognizerVolumeChanged() {

  }

  onSyntheBtnPress(answer) {
    Synthesizer.start(answer);
  }

  async onPauseBtnPress() {
    Synthesizer.pause();
  }

  onResumeBtnPress() {
    Synthesizer.resume();
  }

  async onIsSpeakingBtnPress() {
    let isSpeaking = await Synthesizer.isSpeaking();
    console.log(isSpeaking);
  }

  onSynthesizerSpeakCompletedEvent(result) {
    console.log('onSynthesizerSpeakCompletedEvent\n\n' + JSON.stringify(result));
  }

  onSynthesizerBufferCompletedEvent(result) {
    // alert('onSynthesizerBufferCompletedEvent\n\n' + JSON.stringify(result));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "stretch",
    // alignItems:'baseline'
    padding: 5
  },
  result: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  recordBtn: {
    height: 34,
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc"
  },
  containerStyle: {
    backgroundColor: "#0275d8",
    margin: 4,
    padding: 4,
    borderRadius: 2
  },
  textBtn: {
    borderColor: 'skyblue',
    backgroundColor: "#0275d8",
    margin: 4,
    padding: 4,
    borderRadius: 2,
    textAlign: 'center',
    color: '#fff'
  }
});
