// Constants
const int firstFanPin = 3;
const int mistMakerPin = 9;


void setup() {

  // Configure pins
  pinMode(firstFanPin, OUTPUT);
  pinMode(mistMakerPin, OUTPUT);
  
}

void loop() {

  digitalWrite(firstFanPin, HIGH);
  digitalWrite(mistMakerPin, HIGH);

}
