import './css/index.less';

// 第二步： audio
import mp3Url from './resources/type.mp3';
import wavUrl from './resources/type.wav';
// import AudioPlayer from '@baidu/lego-events-common/lib/ui/AudioPlayer';
import AudioPlayer from '#/ui/AudioPlayer';
const audio = new AudioPlayer({
    src: [
        mp3Url,
        wavUrl
    ],
    loop: true,
    autoplay: true
});


const fn = data => console.log(data);
fn('关二爷');

export default fn;
