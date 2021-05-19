#include <VSync.h>

// Communication variables
ValueReceiver<1> receiver;  // Receiver Object
int active;

// Pins in use
const int firstFanPin = 3;
const int mistMakerPin = 9;

const int pinUP = 225;
const int pinDOWN = 0;


void setup() {
  Serial.begin(9600);

  // Configure pins
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(firstFanPin, OUTPUT);
  pinMode(mistMakerPin, OUTPUT);

  // Communication with Processing
  receiver.observe(active);
  
}

void loop() {
    
  receiver.sync();
  if (active == 1){
    analogWrite(firstFanPin, pinUP);
    analogWrite(mistMakerPin, pinUP);
    digitalWrite(LED_BUILTIN, HIGH);
    //digitalWrite(firstFanPin, HIGH);
    //digitalWrite(mistMakerPin, HIGH);
  } else if (active == 0) {
    analogWrite(firstFanPin, pinDOWN);
    analogWrite(mistMakerPin, pinDOWN);
    digitalWrite(LED_BUILTIN, LOW); 
  } 

}
