
/**
 * @name drum_tests
 */

var harmonics = [1.0, 1.6, 2.13, 2.66, 2.3, 2.92, 3.5, 4.07, 3.6, 4.24, 4.84, 5.42, 4.91, 5.55, 6.16, 6.76, 6.23, 6.86, 7.5, 8.08, 7.53, 8.17];

var freq = 110;

var bass_drum = new Drumhead(freq, harmonics, 10, 0, 2);
var bass_drum2 = new Drumhead(55*3/2, harmonics, 10, 0, 2);
var hihat = NoiseMaker(0.0, 30, 0);
var snare = NoiseMaker(0.8, 18, 0);

var m = 1;

function at(t1,t2){return (t1 >= t2 && t1 <= t2+2/sampleRate);}

export function dsp(t) {
  
  /*
  var w = 0;
  
  for (var i in harmonics){
    var h = harmonics[i];
    w += Math.pow(-1,i) * Math.sin(2*Math.PI*freq*(t%m)*h)/Math.pow(h,2) * Math.exp(-(t%m)*8);
  }
  */
  
  if (at(t%(2*m), 0)) bass_drum.hit(0.1);
  if (at(t%(2*m), m*1/16)) bass_drum.hit(0.15);
  if (at(t%(2*m), m*2/16)) bass_drum.hit(0.15);
  if (at(t%(2*m), m*3/16)) bass_drum.hit(0.2);
  if (at(t%(2*m), m*4/16)) bass_drum.hit(0.25);
  if (at(t%(2*m), m*5/16)) bass_drum.hit(0.25);
  if (at(t%(2*m), m*6/16)) bass_drum.hit(0.5);
  if (at(t%(2*m), m*7/16)) bass_drum.hit(0.5);
  if (at(t%(2*m), m*8/16)) bass_drum.hit(1);
  
  if (at(t%(2*m), m*3/4)) bass_drum2.hit(1);
  
  if (at(t%(2*m), m*1)) bass_drum.hit(1);
  
  if (at(t%(2*m), m*5/4)) bass_drum2.hit(1);
  
  //if (at(t%m, m*0.5)) bass_drum2.hit(1);
  
  if (at(t%(m/4), 0)) hihat.hit(1);
  if (at(t%m, m/2)) snare.hit(1);
  
  
  
  if (at(t%(8*m), m*(3+9/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(4*m), m*(3+10/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(8*m), m*(3+11/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(4*m), m*(3+12/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(8*m), m*(3+13/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(4*m), m*(3+14/16))) snare.hit(0.5 + 0.5 * Math.random());
  if (at(t%(8*m), m*(3+15/16))) snare.hit(0.5 + 0.5 * Math.random());
  
  return compress(bass_drum.play() + bass_drum2.play() + hihat.play() + snare.play());
}

function compress(w){
  return Math.atan(w*(Math.PI/2))/(Math.PI/2);
}


function NoiseMaker(color, decay, base_amp){
  
  var w = 0;
  var v = 0;
  
  return{
    hit : function (vel) {v = vel;},
    set_color: function(c){color = c;},
    play : function(){
      v *= (1 - decay/sampleRate);
      
      w *= color;
      w += v * (2 * Math.random() - 1) * base_amp;
      return w;
    }
  };
  
}


function Drumhead(freq, harmonics, decay, freq_decay, base_amp){
  
  var w = 0;
  var v = 0;
  var f = 0;
  var t = 0;
  
  return{
    
    set_decay : function (d){
      decay = d;
    },
    
    hit : function (vel) {
      t = 0;
      f = freq;
      v = vel*base_amp;
      
    },
    play : function(){
      
      for (var i in harmonics){
        w += Math.pow(1,i) * v * Math.cos(2 * Math.PI * f * harmonics[i] * t) / Math.pow(harmonics[i],1.5) *(2*Math.PI*f)/sampleRate * (0.5 + Math.random());
      }
      
      w *= (1 - decay/sampleRate);
      v *= (1 - decay/sampleRate);
      f *= (1 - freq_decay/sampleRate);
      
      t += 1/sampleRate;
      
      return w;
    }
  };
}