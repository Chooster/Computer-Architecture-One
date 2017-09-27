const cpu = {
  process: (input) => console.log(input),
  initialized: false,
  registering: false,
  save: false,
  currentRegister: undefined,
  register: {},
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
  if (text === 'quit\n') {
    done();
  }
  if(text.indexOf('\n')) {
    const lines = text.split('\n');
    lines.forEach((line) => {
      // prep variable
      const inputBinary = line.split('#')[0].trim()
      const inputDecimal = Number('0b' + inputBinary)

      if (cpu.initialized) { // initialized
        if (cpu.registering) { // entering register
          if (cpu.currentRegister === undefined) { // register number if none exist
            cpu.currentRegister = inputDecimal
            console.log(`register #${cpu.currentRegister}`)
          }
          else if (cpu.save) { // if saved is flagged, save value in register
            cpu.register[cpu.currentRegister] = inputDecimal
            console.log(cpu.register[cpu.currentRegister])
            cpu.save = false
            cpu.registering = false
            cpu.currentRegister = undefined
          }
          else if (inputDecimal === 4) { // flag to set SAVE next
            cpu.save = !cpu.save
            console.log('SAVE next')
          }
        }
        else if(!isNaN(inputDecimal)) { // if register instruction, flag register
          if (inputDecimal === 2) {
            cpu.registering = !cpu.registering
            console.log('SET register')
          }
          else if (inputDecimal === 6) { // PRINT_ALPHA
            console.log('PRINTING VALUES')
            const ascii = Object.values(cpu.register).map((dec) => String.fromCharCode(dec))
            cpu.process(ascii.join(''))
          }
        }
      }
      else if (inputDecimal === 1) { // initialize CPU
        cpu.initialized = !cpu.initialized
        console.log('CPU Initialized...')
      }
      else console.log('CPU Not Initialized..')
    });
  }
});

function done() {
  process.exit()
}
