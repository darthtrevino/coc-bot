command -> 
  rollCommand {% d => d[0] %}
  | helpCommand {% d => d[0] %}

rollCommand -> 
  _ roll __ ability {% d => ({ type: 'roll', ability: d[3] }) %}
  | _ roll __ ability __ forLabel _ {% d => ({ type: 'roll', ability: d[3], ...d[5] }) %}
  | _ roll __ ability  _ withBonusOrPenalty _ {% d => ({ type: 'roll', ability: d[3], ...d[5] }) %}
  | _ roll __ ability  _ withBonusOrPenalty __ forLabel _ {% d => ({ type: 'roll', ability: d[3], ...d[5], ...d[7] }) %}
  
withBonusOrPenalty ->
  bonusShort {% d => ({bonusDice: 1 }) %}
  | penaltyShort {% d => ({penaltyDice: 1 }) %}
  | bonusShort PosInt {% d => ({bonusDice: d[1].literal }) %}
  | penaltyShort PosInt {% d => ({penaltyDice: d[1].literal }) %}
  
forLabel ->
  for __ String {% d => ({label: d[2]}) %}
  | String {% d => ({label: d[0]}) %}

helpCommand ->
  _ help _ {% d => ({type: 'help' }) %}

roll -> "roll"
with -> "with" | null
bonusShort -> "b"
penaltyShort -> "p"
for -> "for"
help -> "help"

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