command -> 
  rollCommand {% d => d[0] %}
  | helpCommand {% d => d[0] %}

rollCommand -> 
  _ roll __ ability {% d => ({ type: 'roll', ability: d[3] }) %}
  | _ roll __ diceExpr _ {% d => ({ type: 'roll', expr: d[3], ...d[5], ...d[7] }) %}
  | _ roll __ diceExpr __ forLabel _ {% d => ({ type: 'roll', expr: d[3], ...d[5], ...d[7] }) %}
  | _ roll __ ability __ forLabel _ {% d => ({ type: 'roll', ability: d[3], ...d[5] }) %}
  | _ roll __ ability  _ withBonusOrPenalty _ {% d => ({ type: 'roll', ability: d[3], ...d[5] }) %}
  | _ roll __ ability  _ withBonusOrPenalty __ forLabel _ {% d => ({ type: 'roll', ability: d[3], ...d[5], ...d[7] }) %}
  
withBonusOrPenalty ->
  bonusShort {% d => ({bonusDice: 1 }) %}
  | penaltyShort {% d => ({penaltyDice: 1 }) %}
  | bonusShort PosInt {% d => ({bonusDice: d[1].literal }) %}
  | penaltyShort PosInt {% d => ({penaltyDice: d[1].literal }) %}
  
forLabel ->
  startComment __ _string {% d => ({label: d[2].trim()}) %}
  | startComment _string {% d => ({label: d[1].trim()}) %}

helpCommand ->
  _ help _ {% d => ({type: 'help' }) %}

roll -> "roll"
with -> "with" | null
bonusShort -> "b"
penaltyShort -> "p"
startComment -> "#"
help -> "help"
d -> "d"
plus -> "+"
minus -> "-"

diceExpr -> 
  PosInt {% d => ({ value: d[0].literal }) %}
  | d PosInt {% d => ({ die: d[1].literal, count: 1 }) %}
  | PosInt d PosInt {% d => ({ count: d[0].literal, die: d[2].literal }) %}
  | diceExpr plus diceExpr {% d => ({ operation: "add", operands: [d[0], d[2]]}) %}
  | diceExpr minus diceExpr {% d => ({ operation: "subtract", operands: [d[0], d[2]]}) %}

ability ->
  PosInt {% d => d[0].literal %} 
  | String {% d => d[0] %} 

# Primitives
# ==========
 
# Numbers
PosInt -> _posint {% d => ({ literal: parseFloat(d[0]) }) %}
Int -> _int {% d => ({ literal: parseFloat(d[0]) }) %}
Float -> _float {% d => ({ literal: parseFloat(d[0])}) %}
Number -> _number {% d => ({ literal: parseFloat(d[0])}) %}

_posint ->
	[0-9] {% id %}
	| _posint [0-9] {% d => d[0] + d[1] %}
 
_int ->
	"-" _posint {% d => d[0] + d[1] %}
	| _posint {% id %}

_float ->
	_int {% id %}
	| _int "." _posint {% d =>d[0] + d[1] + d[2] %}
 
_number ->
	_float {% id %}
	| _float "e" _int {% d => d[0] + d[1] + d[2] %}
 
 
# Strings
 
String -> 
  "\"" _string "\"" {% d => d[1] %}
  | "'" _string "'" {% d => d[1] %}
 
_string ->
	null {% () => "" %}
	| _string _stringchar {% d => d[0] + d[1] %}
 
_stringchar ->
	[^\\"] {% id %}
	| "\\" [^] {% d => JSON.parse("\"" + d[0] + d[1] + "\"") %}

# Whitespace
_ -> null | _ [\s] {% () => null %}
__ -> [\s] | __ [\s] {% () => null %}