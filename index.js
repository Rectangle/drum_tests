
/**
 * @name drum_tests
 */

var bass_drum_harmonics = [1.0, 2.36, 1.72, 1.86, 2.72, 3.64]; // , 4.5, 5.46]
var snare_drum_harmonics = [1.0, 1.6, 2.13, 2.66, 2.3, 2.92, 3.5, 4.07]; // 4.24, 4.84

var bassdrum = Bassdrum(80, 30, 2, 1);

var hihat = NoiseMaker(0, 30, 0.1);

var snare = Snaredrum(220, 20, 0.2, 0.8);
var snare2 = Snaredrum(440, 50, 0.05, 0.0);
var snare3 = Snaredrum(440, 50, 0.05, 0.1);

var tom1 = Bassdrum(82.5, 10, 0.7, 2);
var tom2 = Bassdrum(110, 10, 0.7, 2);
var tom3 = Bassdrum(165, 10, 0.7, 2);

var drums = {
  play : function(){
    
    var bassdrumplay = bassdrum.play();
    var snareplay = snare.play();
    var hihatplay = hihat.play();
    
    var tom1play = tom1.play();
    var tom2play = tom2.play();
    var tom3play = tom3.play();
    
    var snare2play = snare2.play();
    var snare3play = snare3.play();
    
    return [
      bassdrumplay * 0.5 + hihatplay * 0.6 + snareplay * 0.4 + snare2play*0.5 + tom1play*0.8 + tom2play*0.5 + tom3play*0.2, 
      bassdrumplay * 0.5 + hihatplay * 0.4 + snareplay * 0.6 + snare3play*0.5 + tom1play*0.2 + tom2play*0.5 + tom3play*0.8];
  }
};

var bpm = 240;

function at(t1,t2){return (t1 >= t2 && t1 <= t2+1/sampleRate);}

function each(b, beat, per_beat){
  return at(b%per_beat*60/bpm, beat%per_beat*60/bpm);
}

var beats = 0.0;

var tally = 0;

var fill_switch = 0;


export function dsp(t) {
  
  beats += 1/sampleRate/60*bpm;
  
  
  /*
  var w = 0;
  
  for (var i in harmonics){
    var h = harmonics[i];
    w += Math.pow(-1,i) * Math.sin(2*Math.PI*freq*(t%m)*h)/Math.pow(h,2) * Math.exp(-(t%m)*8);
  }
  */
  
  
  if (each(beats,0,1)) hihat.hit(1);
  if (each(beats,0.5,1)) hihat.hit(0.2);
  
  if (each(beats,0,0.5)) snare2.hit(1);
  if (each(beats,0,0.5)) snare3.hit(1);
  
  
  
  if (beats%16 < 12){
  
    if (each(beats,0,4)) bassdrum.hit(1);
    if (each(beats,1,4)) bassdrum.hit(1);
    
    
    if (each(beats,2,4)) snare.hit(1);
    
    if (each(beats,6.5,8)) bassdrum.hit(1);
    
    
    
    if (each(beats,7.5,8)) snare.hit(0.6);
    
    
    if (each(beats,1.5,4) && Math.random() > 0.3) bassdrum.hit(0.6);
    
    if (each(beats,0.75,4) && Math.random() > 0.8) hihat.hit(0.5);
    
  }
  
  
  
  
  if (each(beats,0,16)) fill_switch = (fill_switch+1)%8;//Math.floor(Math.random()*8);
  
  
  switch (fill_switch){
    
    case 0:
      
      if (each(beats,12,16)) bassdrum.hit(1);
      if (each(beats,12+1,16)) bassdrum.hit(1);
      
      if (each(beats,12+1.5,16)) snare.hit(0.5);
      if (each(beats,12+2,16)) snare.hit(1);
      if (each(beats,12+3,16)) snare.hit(0.8);
      if (each(beats,12+3.5,16)) snare.hit(0.4);
      break;
      
    case 1:
      
      if (each(beats,12+0,16)) tom3.hit(1);
      if (each(beats,12+0+1/2,16)) tom3.hit(0.6);
      
      if (each(beats,12+1,16)) tom3.hit(1);
      if (each(beats,12+1+1/3,16)) tom3.hit(0.6);
      if (each(beats,12+1+2/3,16)) tom3.hit(0.5);
      
      if (each(beats,12+2,16)) tom2.hit(1);
      if (each(beats,12+2+1/3,16)) tom2.hit(0.6);
      if (each(beats,12+2+2/3,16)) tom2.hit(0.5);
      
      if (each(beats,12+3,16)) tom1.hit(1);
      if (each(beats,12+3+1/3,16)) tom1.hit(0.6);
      if (each(beats,12+3+2/3,16)) tom1.hit(0.5);
      
      break;
      
    case 2:
      
      if (each(beats,12,16)) bassdrum.hit(1);
      if (each(beats,12+0.5,16)) snare.hit(0.5);
      if (each(beats,12+1,16)) bassdrum.hit(1);
      
      if (each(beats,12+1.5,16)) snare.hit(0.8);
      
      if (each(beats,12+2,16)) snare.hit(1);
      
      
      if (each(beats,12+3,16)) bassdrum.hit(1);
      
      if (each(beats,12+3,16)) snare.hit(0.8);
      
      if (each(beats,12+3.5,16)) snare.hit(0.3);
      
      break;
      
    case 3:
      
      if (each(beats,12+0.5,16)) snare.hit(1);
      
      if (each(beats,12+1,16)) tom2.hit(0.8);
      if (each(beats,12+1.5,16)) tom2.hit(1);
      
      if (each(beats,12+1,16)) snare.hit(1);
      
      if (each(beats,12+2,16)) bassdrum.hit(1);
      if (each(beats,12+2.5,16)) snare.hit(1);
      if (each(beats,12+3,16)) snare.hit(0.6);
      if (each(beats,12+3.5,16)) snare.hit(0.5);
      
      
      break;
      
    case 4:
      if (each(beats,12+0,16)) bassdrum.hit(0.7);
      if (each(beats,12+1,16)) bassdrum.hit(0.8);
      if (each(beats,12+2,16)) bassdrum.hit(1);
      
      if (each(beats,12+0.5,16)) snare.hit(0.2);
      if (each(beats,12+0.75,16)) snare.hit(0.1);
      if (each(beats,12+1,16)) snare.hit(0.3);
      if (each(beats,12+1.25,16)) snare.hit(0.2);
      if (each(beats,12+1.5,16)) snare.hit(0.5);
      if (each(beats,12+1.75,16)) snare.hit(0.2);
      if (each(beats,12+2,16)) snare.hit(0.6);
      if (each(beats,12+2.25,16)) snare.hit(0.6);
      if (each(beats,12+2.5,16)) snare.hit(0.8);
      if (each(beats,12+2.75,16)) snare.hit(1);
      
      if (each(beats,12+3,16)) snare.hit(1);
      if (each(beats,12+3.5,16)) snare.hit(1);
      
      break;
      
    case 5:
      
      if (each(beats,12,16)) bassdrum.hit(1);
      if (each(beats,12+1,16)) bassdrum.hit(1);
      
      if (each(beats,12+2,16)) snare.hit(1);
      
      
      if (each(beats,12+3,16)) bassdrum.hit(1);
      if (each(beats,12+3,16)) snare.hit(0.6);
      if (each(beats,12+3+1/3,16)) snare.hit(0.7);
      if (each(beats,12+3+2/3,16)) snare.hit(0.8);
      
      break;
      
      
      
    case 6:
      
      if (each(beats,12+0,16)) bassdrum.hit(1);
      
      if (each(beats,12+0,16)) snare.hit(0.6);
      if (each(beats,12+0+1/3,16)) snare.hit(0.7);
      if (each(beats,12+0+2/3,16)) snare.hit(0.8);
      if (each(beats,12+1,16)) snare.hit(0.6);
      if (each(beats,12+1+1/3,16)) snare.hit(0.7);
      if (each(beats,12+1+2/3,16)) snare.hit(0.8);
      if (each(beats,12+2,16)) snare.hit(0.3);
      if (each(beats,12+2+1/3,16)) snare.hit(0.4);
      if (each(beats,12+2+2/3,16)) snare.hit(0.5);
      if (each(beats,12+3,16)) snare.hit(0.6);
      if (each(beats,12+3+1/3,16)) snare.hit(0.7);
      if (each(beats,12+3+2/3,16)) snare.hit(0.8);
      
      break;
    
    case 7:
      
      if (each(beats,12+0,16)) bassdrum.hit(0.7);
      if (each(beats,12+1,16)) bassdrum.hit(0.8);
      if (each(beats,12+2,16)) bassdrum.hit(1);
      
      if (each(beats,12+0.5,16)) snare.hit(0.2);
      if (each(beats,12+0.75,16)) snare.hit(0.1);
      if (each(beats,12+1,16)) snare.hit(0.3);
      if (each(beats,12+1.25,16)) snare.hit(0.2);
      if (each(beats,12+1.5,16)) snare.hit(0.5);
      if (each(beats,12+1.75,16)) snare.hit(0.2);
      if (each(beats,12+2,16)) tom2.hit(0.6);
      if (each(beats,12+2.25,16)) tom2.hit(0.6);
      if (each(beats,12+2.5,16)) tom2.hit(0.8);
      if (each(beats,12+2.75,16)) tom2.hit(1);
      
      if (each(beats,12+3,16)) tom1.hit(1);
      if (each(beats,12+3.25,16)) tom1.hit(1);
      if (each(beats,12+3.5,16)) tom1.hit(1);
      if (each(beats,12+3.75,16)) tom1.hit(1);
    
  }
  
  
  //hihat.set_decay(30 - 20 * ((beats/32)%1)*((beats/32)%1));
  


  tally++;

  var output = compress(drums.play());
  
  return output;
  
  
}

function compress(w){
  return [Math.atan(w[0]*(Math.PI/2))/(Math.PI/2), Math.atan(w[1]*(Math.PI/2))/(Math.PI/2)];
}


function NoiseMaker(color, decay, base_amp){
  
  var w = 0;
  var v = 0;
  
  return{
    hit : function (vel) {v = vel;},
    set_color: function(c){color = c;},
    set_decay: function(d){decay = d;},
    play : function(){
      if (v*base_amp < 0.001) {
        v = 0;
        return 0;
      }
      
      v *= (1 - decay/sampleRate);
      
      w *= color;
      w += v * (2 * Math.random() - 1) * base_amp;
      return w;
    }
  };
  
}


function Drumhead(freq, harmonics, harmonic_power, decay, freq_decay, base_amp){
  
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
      
      if (v * f < 0.001){
        v = 0;
        return 0;
      }
      
      for (var i in harmonics){
        w += Math.pow(-1,i) * v * Math.cos(2 * Math.PI * f * harmonics[i] * t) / Math.pow(harmonics[i],harmonic_power+1) *(2*Math.PI*f)/sampleRate;
      }
      
      w *= (1 - decay/sampleRate);
      v *= (1 - decay/sampleRate);
      f *= (1 - freq_decay/sampleRate);
      
      t += 1/sampleRate;
      
      return w;
    }
  };
}

  
function Bassdrum(freq, decay, freq_decay, base_amp){
  
  var tap_decay = 5*decay;
  
  var drumhead = Drumhead(freq, bass_drum_harmonics, 0, decay, freq_decay, base_amp);
  var drumnoise = NoiseMaker(0, tap_decay, base_amp/12);
  
  return{
    
    drumhead : drumhead,
    
    drumnoise : drumnoise,
    
    hit : function(v){
      this.drumhead.hit(v);
      this.drumnoise.hit(v);
    },
    
    play : function(){
      return this.drumhead.play() + this.drumnoise.play();
    }
    
  };
  
}


function Snaredrum(freq, decay, noise_amp, drumhead_amp){
  
  var drumhead = Drumhead(freq, snare_drum_harmonics, 0, decay, 0, drumhead_amp);
  var drumnoise = NoiseMaker(0.95, decay, noise_amp);
  
  
  return{
    
    drumhead : drumhead,
    drumnoise : drumnoise,
    
    hit : function(v){
      
      v *= (Math.random()*2-1) * 0.2 + 1;
      this.drumhead.hit(v);
      this.drumnoise.hit(v);
    },
    
    play : function(){
      return this.drumhead.play() + this.drumnoise.play();
    }
    
  };
  
}

function Tomdrum(freq, decay, base_amp){
  
  return Drumhead(freq, snare_drum_harmonics, -0.5, decay, 0.05, base_amp);
}