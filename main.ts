enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Ground = SpriteKind.create()
    export const Egg = SpriteKind.create()
    export const EggTaken = SpriteKind.create()
    export const WeaponToTake = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const Points = SpriteKind.create()
    export const Rock = SpriteKind.create()
    export const Snail = SpriteKind.create()
    export const EnemyDying = SpriteKind.create()
    export const Snake = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const PlayerDead = SpriteKind.create()
    export const Spider = SpriteKind.create()
    export const Bee = SpriteKind.create()
    export const Fire = SpriteKind.create()
    export const Cloud = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snake, function (sprite, otherSprite) {
    playerDies()
})
function placeTrees (total: number, startPosition: number) {
    for (let index4 = 0; index4 <= total - 1; index4++) {
        treeSprite = sprites.create(treeImage, SpriteKind.Tree)
        treeSprite.top = 0
        treeSprite.left = startPosition + treeSprite.width * index4
        treeSprite.z = -10
        addScreenElement(treeSprite)
    }
}
function spawnRocks () {
    rockLocationsLevel = rockLocations[getLevelIndex()]
    if (rockLocationsLevel.length > 0) {
        aLocation = rockLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = rockLocationsLevel.removeAt(0)
            rockSprite = sprites.create(rockImage, SpriteKind.Rock)
            rockSprite.z = -1
            placeOnGroundOutsideScreen(rockSprite, true)
        }
    }
}
function checkEnemyPosition () {
    for (let value of sprites.allOfKind(SpriteKind.Spider)) {
        if (value.bottom >= maximumHeightForItems) {
            value.bottom = maximumHeightForItems - 2
            value.vy = value.vy * -1
        } else if (value.bottom <= minimumHeightForItems) {
            value.bottom = minimumHeightForItems + 2
            value.vy = value.vy * -1
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Bee)) {
        if (value.bottom >= beesMaximumHeight) {
            value.bottom = beesMaximumHeight - 2
            value.vy = value.vy * -1
        } else if (value.bottom <= beesMinimumHeight) {
            value.bottom = beesMinimumHeight + 2
            value.vy = value.vy * -1
        }
    }
}
// Top line of player jump 22 (jumps 50 pixels)
function animatePlayer () {
    character.loopFrames(
    dude,
    walkingImagesRight,
    Math.abs(walkingSpeed) * 1.5,
    character.rule(Predicate.MovingRight)
    )
    character.loopFrames(
    dude,
    walkingImagesLeft,
    Math.abs(walkingSpeed) * 1.5,
    character.rule(Predicate.MovingLeft)
    )
}
function restartInLevel () {
    if (info.life() > 1) {
        dude.setFlag(SpriteFlag.Invisible, true)
        timer.background(function () {
            color.startFade(color.originalPalette, color.Black, 1000)
            color.pauseUntilFadeDone()
            for (let value of spritesToDestroyAfterDying) {
                screenElements.removeAt(screenElements.indexOf(value))
                value.destroy()
            }
            timer.after(500, function () {
                color.startFade(color.Black, color.originalPalette, 1000)
                color.pauseUntilFadeDone()
                dude.setFlag(SpriteFlag.Invisible, false)
                dude.setKind(SpriteKind.Player)
                setPlayerOnGround(groundPieces[0])
                dying = false
                setIdleImage()
                havePlayerMove()
                playerEnergy.value = 100
                facingRight = true
            })
        })
    } else {
    	
    }
    info.changeLifeBy(-1)
}
function spawnFires () {
    itemLocationsLevel = fireLocations[getLevelIndex()]
    if (itemLocationsLevel.length > 0) {
        aLocation = itemLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = itemLocationsLevel.removeAt(0)
            anItemLevel = sprites.create(fireImages[0], SpriteKind.Fire)
            anItemLevel.z = -1
            animation.runImageAnimation(
            anItemLevel,
            fireImages,
            200,
            true
            )
            placeOnGroundOutsideScreen(anItemLevel, true)
        }
    }
}
function increaseDistanceExplored (distance: number) {
    distanceExplored += distance
    distanceExploredForLevel += distance
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Bee, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, beeDying)
})
function setBees () {
    beeSpeedX = -15
    beeSpeedY = 30
    beesMinimumHeight = 66
    beesMaximumHeight = 88
    beesMiddleHeight = (beesMaximumHeight - beesMinimumHeight) / 2
    beeDying = assets.image`beeDying`
    beeImages = [assets.image`bee1`, assets.image`bee2`]
    beeLocations = [[1408, 1440], [1408]]
    beeLocationsLevelTemp = []
    if (testing) {
        for (let index42 = 0; index42 <= getLevelIndex() - 1; index42++) {
            beeLocations.shift()
        }
        if (beeLocations.length > 0) {
            beeLocationsLevel = beeLocations[0]
            for (let value9 of beeLocationsLevel) {
                if (value9 >= distanceExploredForLevel) {
                    beeLocationsLevelTemp.push(value9)
                }
            }
            beeLocations[getLevelIndex()] = beeLocationsLevelTemp
        }
    }
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Ground, function (sprite, otherSprite) {
    sprite.destroy()
})
function setEgg (positionX: number) {
    anEgg = sprites.create(assets.image`egg`, SpriteKind.Egg)
    placeOnGround(anEgg, positionX)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spider, function (sprite, otherSprite) {
    playerDies()
})
function setSnails () {
    snailSpeed = -5
    snailImageDying = assets.image`snailDying`
    snailImages = [assets.image`snail1`, assets.image`snail2`]
    snailLocations = [[606, 638], [256, 272]]
    snailLocationsLevelTemp = []
    if (testing) {
        for (let index = 0; index <= getLevelIndex() - 1; index++) {
            snailLocations.shift()
        }
        if (snailLocations.length > 0) {
            snailLocationsLevel = snailLocations[0]
            for (let value of snailLocationsLevel) {
                if (value >= distanceExploredForLevel) {
                    snailLocationsLevelTemp.push(value)
                }
            }
            snailLocations[getLevelIndex()] = snailLocationsLevelTemp
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    playerJumps()
})
function havePlayerMove () {
    controller.moveSprite(dude, walkingSpeed, 0)
    dude.x = playerStartsAt
    setPlayerOnGround(groundPieces[0])
    animatePlayer()
    dude.ay = 450
}
function setRocks () {
    rockImage = assets.image`rock`
    rockLocations = [[256, 512, 1072], [256, 300]]
    rockLocationsLevelTemp = []
    if (testing) {
        for (let index2 = 0; index2 <= getLevelIndex() - 1; index2++) {
            rockLocations.shift()
        }
        if (rockLocations.length > 0) {
            rockLocationsLevel = rockLocations[0]
            for (let value2 of rockLocationsLevel) {
                if (value2 >= distanceExploredForLevel) {
                    rockLocationsLevelTemp.push(value2)
                }
            }
            rockLocations[getLevelIndex()] = rockLocationsLevelTemp
        }
    }
}
function playerHitByEnemyLosesEnergy (enemySprite: Sprite, enemyImageDying: Image) {
    if (!(takingDamage)) {
        reduceEnergy2 = sprites.readDataNumber(enemySprite, dataDamage)
        if (reduceEnergy2) {
            reduceEnergy(reduceEnergy2)
        }
        playerTakesDamage(false, enemySprite)
    }
    enemyDies(enemySprite, enemyImageDying)
}
function setPlayer () {
    info.setScore(0)
    info.setLife(3)
    jumping = true
    onGround = false
    dying = false
    facingRight = true
    throwingWeapon = false
    takingDamage = false
    jumpSpeed = -200
    weaponThrownEveryMs = 200
    weaponLastThrowTime = game.runtime()
    eneryLostEveryMs = 250
    energyLostEachTime = 1
    energyLastLostTime = game.runtime() + eneryLostEveryMs
    setPlayerImages()
    dude = sprites.create(idleImagesRight[0], SpriteKind.Player)
    walkingSpeed = 80
    havePlayerMove()
    playerEnergy = statusbars.create(60, 8, StatusBarKind.Energy)
    playerEnergy.x = screenWidth / 2
    playerEnergy.top = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WeaponToTake, function (sprite, otherSprite) {
    hasWeapon = true
    otherSprite.destroy()
    sprite.say("Weapon!")
    timer.after(250, function () {
        playerThrowsWeapon()
    })
    timer.after(1000, function () {
        sprite.say("")
    })
})
function spawnFood () {
    foodLocationsLevel = foodLocations[getLevelIndex()]
    if (foodLocationsLevel.length > 0) {
        foodLocationSet = foodLocationsLevel[0]
        foodLocation = foodLocationSet[0]
        if (foodLocation <= distanceExploredForLevel) {
            foodLocationSet = foodLocationsLevel.removeAt(0)
            foodType = foodLocationSet[1]
            foodSprite = sprites.create(foodImages[foodType], SpriteKind.Food)
            sprites.setDataNumber(foodSprite, dataPoints, foodPoints[foodType])
            sprites.setDataNumber(foodSprite, dataEnergy, foodEnergies[foodType])
            foodSprite.x = screenWidth + foodLocationSet[2]
            foodSprite.bottom = foodLocationSet[3]
            addScreenElement(foodSprite)
            addSpriteToBeRemovedWhenDying(foodSprite)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fire, function (sprite, otherSprite) {
    playerDies()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerThrowsWeapon()
})
sprites.onOverlap(SpriteKind.EggTaken, SpriteKind.Ground, function (sprite, otherSprite) {
    weapon = sprites.create(assets.image`weapon`, SpriteKind.WeaponToTake)
    weapon.x = anEgg.x
    weapon.bottom = anEgg.bottom
    addScreenElement(weapon)
    anEgg.destroy(effects.disintegrate, 500)
})
function placeOnGround (aSprite: Sprite, distanceFromPlayer: number) {
    aSprite.bottom = groundPieces[0].top
    aSprite.x = dude.x + Math.abs(distanceFromPlayer)
    aSprite.bottom = groundPieces[0].top
    addScreenElement(aSprite)
}
function removeScreenElement (aSprite: Sprite, destroy: boolean) {
    screenElements.removeAt(screenElements.indexOf(aSprite))
    if (destroy) {
        aSprite.destroy()
    }
}
function addSpriteToBeRemovedWhenDying (aSprite: Sprite) {
    spritesToDestroyAfterDying.push(aSprite)
}
// levelDisplay = textsprite.create("")
// levelDisplay.top = 0
// levelDisplay.left = 30
// setLevelDisplay()
function setVariables () {
    scene.setBackgroundColor(8)
    screenWidth = scene.screenWidth()
    screenHeight = scene.screenHeight()
    level = 2
    area = 1
    groundHasGapsAfterLevel = 3
    testing = true
    showingIntroduction = false
    inLevel = []
    groundHasGaps = false
    canGetWeapon = false
    hasWeapon = false
    distanceExploredForLevel = 0
    changeLevelAfterDistanceOf = 50
    playerStartsAt = 15
    playerCannotMovePast = 40
    minimumHeightForItems = 48
    maximumHeightForItems = 104
    playerTop = 72
    gapMinimum = 16
    gapMaximum = 55
    dataPoints = "points"
    dataEnergy = "energy"
    dataSpeedX = "speedX"
    dataSpeedY = "speedY"
    dataDamage = "damage"
    dataCanMoveUpAndDown = "canMoveUpAndDown"
    screenElements = []
    spritesToDestroyAfterDying = []
}
function setFood () {
    foodImages = [assets.image`banana`, assets.image`apple`, assets.image`carrot`, assets.image`cake`, assets.image`hamburger`]
    foodPoints = [50, 50, 100, 200, 500]
    foodEnergies = [5, 5, 10, 15, 20]
    foodLocations = [[
    [160, 0, -20, maximumHeightForItems],
    [224, 1, -20, 104],
    [240, 2, -20, 55],
    [800, 1, -20, 66],
    [832, 0, -20, maximumHeightForItems],
    [1056, 2, -40, 80],
    [1088, 1, -40, minimumHeightForItems],
    [1248, 0, -40, maximumHeightForItems],
    [1296, 3, -60, 80],
    [1328, 4, -10, minimumHeightForItems]
    ], [[160, 0, -20, maximumHeightForItems], [224, 1, -20, 104]]]
    foodLocationsVisited = [[[160]], [[160]]]
    foodLocationsVisited = []
    foodLocationsLevel = [[165], [224], [240]]
    foodLocationsLevel = []
    foodLocationsLevelVisited = [[165], [224], [240]]
    foodLocationsLevelVisited = []
    foodLocationsLevelTemp = [[165], [224], [240]]
    foodLocationsLevelTemp = []
    foodLocationSet = [165]
    foodLocationSet = []
    foodLocationSetVisited = [165]
    foodLocationSetVisited = []
    if (testing) {
        for (let index3 = 0; index3 <= getLevelIndex() - 1; index3++) {
            foodLocationsVisited.push(foodLocations.shift())
        }
        if (foodLocations.length > 0) {
            foodLocationsLevel = foodLocations[0]
            for (let index = 0; index <= foodLocationsLevel.length - 1; index++) {
                foodLocationSet = foodLocationsLevel[index]
                foodLocation = foodLocationSet[0]
                if (foodLocation >= distanceExploredForLevel) {
                    foodLocationsLevelTemp.push(foodLocationSet)
                } else {
                    foodLocationsLevelVisited.push(foodLocationSet)
                }
            }
            foodLocations[getLevelIndex()] = foodLocationsLevelTemp
        }
    }
}
function checkGroundOffScreen () {
    for (let value22 of groundPieces) {
        if (value22.right < 0) {
            groundPieces.removeAt(groundPieces.indexOf(value22))
            value22.destroy()
        }
    }
    if (!(groundHasGaps)) {
        for (let index32 = 0; index32 <= groundPieces.length - 1; index32++) {
            aGround = groundPieces[index32]
            if (index32 + 1 < groundPieces.length) {
                nextGroundPiece = groundPieces[index32 + 1]
                nextGroundPiece.left = aGround.right
            }
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
})
function reduceEnergyOverTime () {
    if (!(dying)) {
        if (energyLastLostTime < game.runtime()) {
            energyLastLostTime = game.runtime() + eneryLostEveryMs
            playerEnergy.value += energyLostEachTime * -1
        }
    }
}
function getLevelIndex () {
    return level - 1
}
function setClouds () {
    cloudsMinimumHeight = 5
    cloudsMaximumHeight = 23
    cloudImages = [assets.image`cloudSmall`, assets.image`cloudLarge`]
    cloudLocations = [[1616, 1680, 1760], [1408]]
    if (testing) {
        for (let index42 = 0; index42 <= getLevelIndex() - 1; index42++) {
            cloudLocations.shift()
        }
        if (cloudLocations.length > 0) {
            itemLocationsLevel = cloudLocations[0]
            for (let value9 of itemLocationsLevel) {
                if (value9 >= distanceExploredForLevel) {
                    itemLocationsLevelTemp.push(value9)
                }
            }
            cloudLocations[getLevelIndex()] = itemLocationsLevelTemp
        }
    }
}
function defineImages () {
    weaponImagesRight = [assets.image`weaponThrown1`, assets.image`weaponThrown2`, assets.image`weaponThrown3`, assets.image`weaponThrown4`]
    weaponImagesLeft = []
    for (let value222 of weaponImagesRight) {
        anImage = value222.clone()
        anImage.flipX()
        weaponImagesLeft.push(anImage)
    }
    pointsImages = [assets.image`points50`, assets.image`points100`, assets.image`points200`, assets.image`points500`]
}
function getNextGroundPiece () {
    groundMaximumX = 0
    for (let value2222 of groundPieces) {
        if (value2222.right > groundMaximumX) {
            groundMaximumX = value2222.right
        }
    }
    if (groundMaximumX < screenWidth - gap) {
        setRandomGround()
        setNextGap()
    }
}
function enemyDies (anEnemy: Sprite, dyingImage: Image) {
    sprites.setDataNumber(anEnemy, dataSpeedX, 0)
    animation.stopAnimation(animation.AnimationTypes.All, anEnemy)
    anEnemy.setImage(dyingImage)
    anEnemy.vy = -150
    anEnemy.ay = 400
    anEnemy.setKind(SpriteKind.EnemyDying)
}
function moveScreenElements () {
    gameSpeed = 0
    if (dude.vx > 0) {
        gameSpeed = dude.vx * -1
    } else {
        for (let value4 of screenElements) {
            if (value4.right < 0) {
                removeScreenElement(value4, true)
            }
        }
        for (let value32 of groundPieces) {
            value32.vx = 0
        }
        for (let value42 of screenElements) {
            spriteSpeedX = sprites.readDataNumber(value42, dataSpeedX)
            if (value42.left < screenWidth) {
                if (spriteSpeedX) {
                    value42.vx = spriteSpeedX
                } else {
                    value42.vx = 0
                }
            } else {
                value42.vx = gameSpeed
            }
        }
    }
    if (dude.x + 1 > playerCannotMovePast && dude.vx > 0) {
        for (let value5 of groundPieces) {
            value5.vx = gameSpeed
        }
        for (let value6 of screenElements) {
            spriteSpeedX = sprites.readDataNumber(value6, dataSpeedX)
            if (value6.left < screenWidth) {
                if (spriteSpeedX) {
                    value6.vx = gameSpeed + spriteSpeedX
                } else {
                    value6.vx = gameSpeed
                }
            } else {
                value6.vx = gameSpeed
            }
        }
    }
}
function spawnTrees () {
    treeLocationsLevel = treeLocations[getLevelIndex()]
    if (treeLocationsLevel.length > 0) {
        aLocation = treeLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = treeLocationsLevel.removeAt(0)
            treeSprite = sprites.create(treeImage, SpriteKind.Tree)
            treeSprite.z = -10
            placeOnGroundOutsideScreen(treeSprite, false)
        }
    }
}
function createBackgroundSprites () {
    ground1 = assets.image`ground1`
    ground2 = assets.image`ground2`
    ground3 = assets.image`ground3`
    ground4 = assets.image`ground4`
    ground5 = assets.image`ground5`
    ground6 = assets.image`ground6`
    ground7 = assets.image`ground7`
    ground8 = assets.image`ground8`
    ground9 = assets.image`ground9`
    ground10 = assets.image`ground10`
    aGround = sprites.create(ground10, SpriteKind.Ground)
    aGround.bottom = screenHeight
    groundPieces = [aGround]
    increaseDistanceExplored(aGround.width)
    setNextGap()
}
function playerDies () {
    if (!(dying)) {
        dying = true
        dude.setKind(SpriteKind.PlayerDead)
        playerEnergy.value = 0
        animation.stopAnimation(animation.AnimationTypes.All, dude)
        character.setCharacterAnimationsEnabled(dude, false)
        dude.setImage(dyingImages[1])
        controller.moveSprite(dude, 0, 0)
        dude.vy += -200
        for (let value of screenElements) {
            value.vx = 0
            value.vy = 0
        }
        for (let value of groundPieces) {
            value.vx = 0
            value.vy = 0
        }
        timer.after(250, function () {
            animation.runImageAnimation(
            dude,
            dyingImages,
            250,
            false
            )
            timer.after(500, function () {
                animation.stopAnimation(animation.AnimationTypes.All, dude)
                dude.setImage(dyingImages[0])
                timer.after(500, function () {
                    restartInLevel()
                })
            })
        })
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = true
})
function spawnSpiders () {
    spiderLocationsLevel = spiderLocations[getLevelIndex()]
    if (spiderLocationsLevel.length > 0) {
        aLocation = spiderLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = spiderLocationsLevel.removeAt(0)
            spiderSprite = sprites.create(spiderImages[0], SpriteKind.Spider)
            spiderSprite.bottom = maximumHeightForItems
            sprites.setDataNumber(spiderSprite, dataSpeedY, spiderSpeed)
            sprites.setDataNumber(spiderSprite, dataPoints, 20)
            sprites.setDataBoolean(spiderSprite, dataCanMoveUpAndDown, true)
            if (sprites.readDataBoolean(spiderSprite, dataCanMoveUpAndDown)) {
                spriteBottom = getYBetweenTopAndGround()
            } else {
                spriteBottom = getYBetweenPlayerTopAndGround()
            }
            spiderSprite.vy = spiderSpeed
            animation.runImageAnimation(
            spiderSprite,
            spiderImages,
            250,
            true
            )
            placeOutsideScreen(spiderSprite, spriteBottom, true)
            addSpriteToBeRemovedWhenDying(spiderSprite)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, function (sprite, otherSprite) {
    if (!(takingDamage)) {
        reduceEnergy(10)
        playerTakesDamage(false, otherSprite)
    }
})
function spawnEnemies () {
    spawnSnails()
    spawnSnakes()
    spawnSpiders()
    spawnBees()
}
function setTrees () {
    treeImage = assets.image`trees`
    treeWidth = 180
    treeLocations = [[
    192,
    384,
    576,
    768,
    960,
    1152,
    1344
    ], [256, 300]]
    treeLocationsLevelTemp = []
    if (testing) {
        for (let index2 = 0; index2 <= getLevelIndex() - 1; index2++) {
            treeLocations.shift()
        }
        if (treeLocations.length > 0) {
            treeLocationsLevel = treeLocations[0]
            for (let value2 of treeLocationsLevel) {
                if (value2 >= distanceExploredForLevel) {
                    treeLocationsLevelTemp.push(value2)
                }
            }
            treeLocations[getLevelIndex()] = treeLocationsLevelTemp
        }
    }
}
function setPlayerImages () {
    idleImagesRight = [assets.image`idle1`, assets.image`idle2`]
    idleImagesLeft = []
    for (let value7 of idleImagesRight) {
        anImage = value7.clone()
        anImage.flipX()
        idleImagesLeft.push(anImage)
    }
    walkingImagesRight = [assets.image`walking1`, assets.image`walking2`, assets.image`walking3`, assets.image`walking4`, assets.image`walking5`]
    walkingImagesLeft = []
    for (let value72 of walkingImagesRight) {
        anImage = value72.clone()
        anImage.flipX()
        walkingImagesLeft.push(anImage)
    }
    throwingImagesRight = [assets.image`throwing1`, assets.image`throwing2`]
    throwingImagesLeft = []
    for (let value73 of throwingImagesRight) {
        anImage = value73.clone()
        anImage.flipX()
        throwingImagesLeft.push(anImage)
    }
    fallingImagesRight = [assets.image`falling1`, assets.image`falling2`]
    fallingImagesLeft = [assets.image`fallingBackwards1`, assets.image`fallingBackwards2`]
    jumpingImageRight = assets.image`jumpingRight`
    jumpingImageLeft = assets.image`jumpingLeft`
    dyingImages = [assets.image`dying1`, assets.image`dying2`]
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Spider, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, spiderImageDying)
})
function checkLevelFromDistance () {
    if (distanceExploredForLevel > changeLevelAfterDistanceOf) {
        level += 1
        distanceExploredForLevel = 0
    }
}
function addEnergy (aSprite: Sprite) {
    playerEnergy.value += sprites.readDataNumber(aSprite, dataEnergy)
}
function playerTakesDamage (destroySprite: boolean, aSprite: Sprite) {
    if (destroySprite) {
    	
    }
    controller.moveSprite(dude, 0, 0)
    takingDamage = true
    animation.stopAnimation(animation.AnimationTypes.All, dude)
    character.setCharacterAnimationsEnabled(dude, false)
    dude.vy = -100
    if (facingRight) {
        animation.runImageAnimation(
        dude,
        fallingImagesRight,
        500,
        false
        )
        dude.vx = 85
    } else {
        animation.runImageAnimation(
        dude,
        fallingImagesLeft,
        500,
        false
        )
        dude.vx = 50
    }
    timer.after(600, function () {
        controller.moveSprite(dude, walkingSpeed, 0)
        character.setCharacterAnimationsEnabled(dude, false)
        takingDamage = false
    })
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Snail, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, snailImageDying)
})
function checkOnGround () {
    if (!(dying)) {
        onGround = false
        for (let value8 of groundPieces) {
            if (!(onGround)) {
                if (dude.overlapsWith(value8)) {
                    while (dude.overlapsWith(value8)) {
                        dude.y += -0.5
                    }
                    setPlayerOnGround(value8)
                }
            }
        }
    }
}
function setSpiders () {
    spiderSpeed = 20
    spiderImageDying = assets.image`spiderDying`
    spiderImages = [assets.image`spider1`, assets.image`spider2`]
    spiderLocations = [[1104, 1152], [1248, 1312]]
    spiderLocationsLevelTemp = []
    if (testing) {
        for (let index = 0; index <= getLevelIndex() - 1; index++) {
            spiderLocations.shift()
        }
        if (spiderLocations.length > 0) {
            spiderLocationsLevel = spiderLocations[0]
            for (let value of spiderLocationsLevel) {
                if (value >= distanceExploredForLevel) {
                    spiderLocationsLevelTemp.push(value)
                }
            }
            spiderLocations[getLevelIndex()] = spiderLocationsLevelTemp
        }
    }
}
function setFires () {
    fireImages = [assets.image`fire1`, assets.image`fire2`, assets.image`fire3`, assets.image`fire4`]
    fireLocations = [[1632, 1712], [1632, 1712]]
    itemLocationsLevelTemp = []
    if (testing) {
        for (let index2 = 0; index2 <= getLevelIndex() - 1; index2++) {
            fireLocations.shift()
        }
        if (fireLocations.length > 0) {
            itemLocationsLevel = fireLocations[0]
            for (let value2 of itemLocationsLevel) {
                if (value2 >= distanceExploredForLevel) {
                    itemLocationsLevelTemp.push(value2)
                }
            }
            fireLocations[getLevelIndex()] = itemLocationsLevelTemp
        }
    }
}
function reduceEnergy (amount: number) {
    playerEnergy.value += amount * -1
}
function setEnemies () {
    setSnails()
    setSnakes()
    setSpiders()
    setBees()
}
function spawnSnakes () {
    snakeLocationsLevel = snakeLocations[getLevelIndex()]
    if (snakeLocationsLevel.length > 0) {
        aLocation = snakeLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = snakeLocationsLevel.removeAt(0)
            snakeSprite = sprites.create(img`
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                ............77777........
                ..........777777557......
                `, SpriteKind.Snake)
            sprites.setDataNumber(snakeSprite, dataDamage, 30)
            sprites.setDataNumber(snakeSprite, dataPoints, 30)
            placeOnGround(snakeSprite, screenWidth / 2)
            addSpriteToBeRemovedWhenDying(snakeSprite)
            animation.runImageAnimation(
            snakeSprite,
            snakeImagesAppearing,
            100,
            false
            )
            timer.after(500, function () {
                animation.runImageAnimation(
                snakeSprite,
                snakeImages,
                200,
                true
                )
            })
        }
    }
}
function spawnClouds () {
    itemLocationsLevel = cloudLocations[getLevelIndex()]
    if (itemLocationsLevel.length > 0) {
        aLocation = itemLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = itemLocationsLevel.removeAt(0)
            aSprite = sprites.create(cloudImages[randint(0, cloudImages.length - 1)], SpriteKind.Cloud)
            aSprite.top = randint(cloudsMinimumHeight, cloudsMaximumHeight)
            aSprite.z = -10
            placeOutsideScreen(aSprite, aSprite.top, false)
        }
    }
}
function setRandomGround () {
    groundLength = randint(2, 10)
    groundLength = 1
    if (groundLength == 2) {
        aGround = sprites.create(ground2, SpriteKind.Ground)
    } else if (groundLength == 3) {
        aGround = sprites.create(ground3, SpriteKind.Ground)
    } else if (groundLength == 4) {
        aGround = sprites.create(ground4, SpriteKind.Ground)
    } else if (groundLength == 5) {
        aGround = sprites.create(ground5, SpriteKind.Ground)
    } else if (groundLength == 6) {
        aGround = sprites.create(ground6, SpriteKind.Ground)
    } else if (groundLength == 7) {
        aGround = sprites.create(ground7, SpriteKind.Ground)
    } else if (groundLength == 8) {
        aGround = sprites.create(ground8, SpriteKind.Ground)
    } else if (groundLength == 9) {
        aGround = sprites.create(ground9, SpriteKind.Ground)
    } else if (groundLength == 10) {
        aGround = sprites.create(ground10, SpriteKind.Ground)
    } else if (groundLength == 1) {
        aGround = sprites.create(ground1, SpriteKind.Ground)
    }
    aGround.left = screenWidth
    aGround.bottom = screenHeight
    aGround.z = -9
    groundPieces.push(aGround)
    increaseDistanceExplored(aGround.width)
}
function checkPlayerPosition () {
    if (dude.x > playerCannotMovePast) {
        dude.x = playerCannotMovePast
    } else if (dude.x < playerStartsAt) {
        dude.x = playerStartsAt
    }
    if (dude.top > screenHeight) {
        if (!(dying)) {
            playerDies()
        }
    }
    dude.say(distanceExploredForLevel)
}
function getYBetweenTopAndGround () {
    return randint(minimumHeightForItems, maximumHeightForItems)
}
function spawnSnails () {
    snailLocationsLevel = snailLocations[getLevelIndex()]
    if (snailLocationsLevel.length > 0) {
        aLocation = snailLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = snailLocationsLevel.removeAt(0)
            snailSprite = sprites.create(snailImages[0], SpriteKind.Snail)
            sprites.setDataNumber(snailSprite, dataSpeedX, snailSpeed)
            sprites.setDataNumber(snailSprite, dataDamage, 15)
            sprites.setDataNumber(snailSprite, dataPoints, 10)
            animation.runImageAnimation(
            snailSprite,
            snailImages,
            500,
            true
            )
            placeOnGroundOutsideScreen(snailSprite, true)
            addSpriteToBeRemovedWhenDying(snailSprite)
        }
    }
}
function checkPlayerOverlaps () {
    if (dude.overlapsWith(anEgg)) {
        playerGetsEgg()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (!(dying)) {
        showPoints(otherSprite)
        addEnergy(otherSprite)
        removeScreenElement(otherSprite, true)
    }
})
function placeOutsideScreen (aSprite: Sprite, yPosition: number, useBottom: boolean) {
    if (useBottom) {
        aSprite.bottom = yPosition
    } else {
        aSprite.top = yPosition
    }
    aSprite.left = screenWidth
    addScreenElement(aSprite)
}
function setNextGap () {
    if (groundHasGaps) {
        gap = randint(gapMinimum, gapMaximum)
    } else {
        gap = 0
    }
}
function placeOnGroundOutsideScreen (aSprite: Sprite, destroyWhenPlayerDies: boolean) {
    aSprite.bottom = groundPieces[0].top
    aSprite.left = screenWidth
    addScreenElement(aSprite)
    if (destroyWhenPlayerDies) {
        addSpriteToBeRemovedWhenDying(aSprite)
    }
}
function getYBetweenPlayerTopAndGround () {
    return randint(playerTop + 3, maximumHeightForItems)
}
function playerGetsEgg () {
    if (!(canGetWeapon)) {
        removeScreenElement(anEgg, false)
        anEgg.setKind(SpriteKind.EggTaken)
        anEgg.setImage(assets.image`eggBroken`)
        anEgg.vy = -75
        anEgg.vx = 50
        anEgg.ay = 200
        canGetWeapon = true
    }
}
function setSnakes () {
    snakeImageDying = assets.image`snakeDying`
    snakeImages = [assets.image`snake1`, assets.image`snake2`, assets.image`snake3`]
    snakeImagesAppearing = [assets.image`snakeAppearing1`, assets.image`snakeAppearing2`, assets.image`snakeAppearing3`, assets.image`snakeAppearing4`, assets.image`snakeAppearing5`]
    snakeLocations = [[902], [902]]
    snakeLocationsLevelTemp = []
    if (testing) {
        for (let index42 = 0; index42 <= getLevelIndex() - 1; index42++) {
            snakeLocations.shift()
        }
        if (snakeLocations.length > 0) {
            snakeLocationsLevel = snakeLocations[0]
            for (let value9 of snakeLocationsLevel) {
                if (value9 >= distanceExploredForLevel) {
                    snakeLocationsLevelTemp.push(value9)
                }
            }
            snakeLocations[getLevelIndex()] = snakeLocationsLevelTemp
        }
    }
}
function playerThrowsWeapon () {
    if (hasWeapon && !(dying)) {
        if (weaponLastThrowTime < game.runtime()) {
            throwingWeapon = true
            character.setCharacterAnimationsEnabled(dude, false)
            weaponLastThrowTime = game.runtime() + weaponThrownEveryMs
            weaponSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Weapon)
            weaponSprite.y = dude.y - 10
            if (facingRight) {
                animation.runImageAnimation(
                dude,
                throwingImagesRight,
                200,
                false
                )
                weaponSprite.x = dude.x - 7
                animation.runImageAnimation(
                weaponSprite,
                weaponImagesRight,
                150,
                true
                )
                timer.after(100, function () {
                    weaponSprite.ay = 200
                    weaponSprite.vx = 125
                })
            } else {
                animation.runImageAnimation(
                dude,
                throwingImagesLeft,
                200,
                false
                )
                weaponSprite.x = dude.x + 7
                animation.runImageAnimation(
                weaponSprite,
                weaponImagesLeft,
                150,
                true
                )
                timer.after(100, function () {
                    weaponSprite.ay = 200
                    weaponSprite.vx = -125
                })
            }
            timer.after(350, function () {
                throwingWeapon = false
                character.setCharacterAnimationsEnabled(dude, true)
                setIdleImage()
            })
        }
    }
}
statusbars.onZero(StatusBarKind.Energy, function (status) {
    if (!(dying)) {
        dude.say("No vitality!")
        controller.moveSprite(dude, 0, 0)
        timer.after(1000, function () {
            dude.say("")
            playerDies()
        })
    }
})
function setPlayerOnGround (ground: Sprite) {
    if (!(throwingWeapon)) {
        if (jumping) {
            setIdleImage()
        }
        character.setCharacterAnimationsEnabled(dude, true)
    }
    onGround = true
    jumping = false
    dude.bottom = ground.top
    dude.vx = 0
    dude.vy = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bee, function (sprite, otherSprite) {
    playerDies()
})
function showPoints (aSprite: Sprite) {
    if (sprites.readDataNumber(aSprite, dataPoints) == 500) {
        anImage = pointsImages[3]
        pointsTaken = 500
    } else if (sprites.readDataNumber(aSprite, dataPoints) == 200) {
        anImage = pointsImages[2]
        pointsTaken = 200
    } else if (sprites.readDataNumber(aSprite, dataPoints) == 100) {
        anImage = pointsImages[1]
        pointsTaken = 100
    } else {
        anImage = pointsImages[0]
        pointsTaken = 50
    }
    pointsSprite = sprites.create(anImage, SpriteKind.Points)
    pointsSprite.setPosition(aSprite.x, aSprite.y)
    pointsSprite.setFlag(SpriteFlag.Invisible, false)
    addScreenElement(pointsSprite)
    timer.after(250, function () {
        pointsSprite.setFlag(SpriteFlag.Invisible, true)
        info.changeScoreBy(pointsTaken)
        timer.after(1500, function () {
            removeScreenElement(pointsSprite, true)
        })
    })
}
function setIdleImage () {
    if (facingRight) {
        dude.setImage(idleImagesRight[0])
    } else {
        dude.setImage(idleImagesLeft[0])
    }
}
function addScreenElement (aSprite: Sprite) {
    screenElements.push(aSprite)
}
function removeDyingEnemies () {
    for (let value92 of sprites.allOfKind(SpriteKind.EnemyDying)) {
        if (value92.top > screenHeight) {
            removeScreenElement(value92, true)
        }
    }
}
function playerJumps () {
    if (onGround) {
        character.setCharacterAnimationsEnabled(dude, false)
        dude.vy = jumpSpeed
        jumping = true
        if (facingRight) {
            dude.setImage(jumpingImageRight)
        } else {
            dude.setImage(jumpingImageLeft)
        }
    }
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Snake, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, snakeImageDying)
})
function checkPlayer () {
    checkPlayerPosition()
    checkPlayerOverlaps()
}
function spawnBees () {
    beeLocationsLevel = beeLocations[getLevelIndex()]
    if (beeLocationsLevel.length > 0) {
        aLocation = beeLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = beeLocationsLevel.removeAt(0)
            aSprite = sprites.create(beeImages[0], SpriteKind.Bee)
            aSprite.bottom = randint(beesMinimumHeight + 2, beesMaximumHeight - 2)
            sprites.setDataNumber(aSprite, dataSpeedX, beeSpeedX)
            if (aSprite.y <= beesMiddleHeight) {
                anEnemySpeedY = beeSpeedY
            } else {
                anEnemySpeedY = beeSpeedY * -1
            }
            sprites.setDataNumber(aSprite, dataSpeedY, anEnemySpeedY)
            sprites.setDataNumber(aSprite, dataPoints, 30)
            aSprite.vy = anEnemySpeedY
            animation.runImageAnimation(
            aSprite,
            beeImages,
            250,
            true
            )
            placeOutsideScreen(aSprite, aSprite.bottom, true)
            addSpriteToBeRemovedWhenDying(aSprite)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snail, function (sprite, otherSprite) {
    playerHitByEnemyLosesEnergy(otherSprite, snailImageDying)
})
let anEnemySpeedY = 0
let pointsSprite: Sprite = null
let pointsTaken = 0
let weaponSprite: Sprite = null
let snakeLocationsLevelTemp: number[] = []
let snakeImageDying: Image = null
let snailSprite: Sprite = null
let groundLength = 0
let aSprite: Sprite = null
let snakeImages: Image[] = []
let snakeImagesAppearing: Image[] = []
let snakeSprite: Sprite = null
let snakeLocations: number[][] = []
let snakeLocationsLevel: number[] = []
let spiderLocationsLevelTemp: number[] = []
let spiderImageDying: Image = null
let jumpingImageLeft: Image = null
let jumpingImageRight: Image = null
let fallingImagesLeft: Image[] = []
let fallingImagesRight: Image[] = []
let throwingImagesLeft: Image[] = []
let throwingImagesRight: Image[] = []
let idleImagesLeft: Image[] = []
let treeLocationsLevelTemp: number[] = []
let treeWidth = 0
let spriteBottom = 0
let spiderSpeed = 0
let spiderImages: Image[] = []
let spiderSprite: Sprite = null
let spiderLocations: number[][] = []
let spiderLocationsLevel: number[] = []
let dyingImages: Image[] = []
let ground10: Image = null
let ground9: Image = null
let ground8: Image = null
let ground7: Image = null
let ground6: Image = null
let ground5: Image = null
let ground4: Image = null
let ground3: Image = null
let ground2: Image = null
let ground1: Image = null
let treeLocations: number[][] = []
let treeLocationsLevel: number[] = []
let spriteSpeedX = 0
let gameSpeed = 0
let gap = 0
let groundMaximumX = 0
let pointsImages: Image[] = []
let anImage: Image = null
let weaponImagesLeft: Image[] = []
let weaponImagesRight: Image[] = []
let itemLocationsLevelTemp: number[] = []
let cloudLocations: number[][] = []
let cloudImages: Image[] = []
let cloudsMaximumHeight = 0
let cloudsMinimumHeight = 0
let nextGroundPiece: Sprite = null
let aGround: Sprite = null
let foodLocationSetVisited: number[] = []
let foodLocationsLevelTemp: number[][] = []
let foodLocationsLevelVisited: number[][] = []
let foodLocationsVisited: number[][][] = []
let dataCanMoveUpAndDown = ""
let dataSpeedY = ""
let dataSpeedX = ""
let gapMaximum = 0
let gapMinimum = 0
let playerTop = 0
let playerCannotMovePast = 0
let changeLevelAfterDistanceOf = 0
let canGetWeapon = false
let groundHasGaps = false
let inLevel: number[] = []
let showingIntroduction = false
let groundHasGapsAfterLevel = 0
let area = 0
let level = 0
let screenHeight = 0
let weapon: Sprite = null
let foodEnergies: number[] = []
let dataEnergy = ""
let foodPoints: number[] = []
let foodImages: Image[] = []
let foodSprite: Sprite = null
let foodType = 0
let foodLocation = 0
let foodLocationSet: number[] = []
let foodLocations: number[][][] = []
let foodLocationsLevel: number[][] = []
let hasWeapon = false
let screenWidth = 0
let idleImagesRight: Image[] = []
let energyLastLostTime = 0
let energyLostEachTime = 0
let eneryLostEveryMs = 0
let weaponLastThrowTime = 0
let weaponThrownEveryMs = 0
let jumpSpeed = 0
let throwingWeapon = false
let onGround = false
let jumping = false
let dataDamage = ""
let reduceEnergy2 = 0
let takingDamage = false
let rockLocationsLevelTemp: number[] = []
let playerStartsAt = 0
let snailLocationsLevel: number[] = []
let snailLocationsLevelTemp: number[] = []
let snailLocations: number[][] = []
let snailImages: Image[] = []
let snailImageDying: Image = null
let snailSpeed = 0
let anEgg: Sprite = null
let beeLocationsLevel: number[] = []
let beeLocationsLevelTemp: number[] = []
let beeLocations: number[][] = []
let beeImages: Image[] = []
let beesMiddleHeight = 0
let beeSpeedY = 0
let beeSpeedX = 0
let beeDying: Image = null
let dataPoints = ""
let distanceExplored = 0
let fireImages: Image[] = []
let anItemLevel: Sprite = null
let fireLocations: number[][] = []
let itemLocationsLevel: number[] = []
let facingRight = false
let playerEnergy: StatusBarSprite = null
let dying = false
let groundPieces: Sprite[] = []
let screenElements: Sprite[] = []
let spritesToDestroyAfterDying: Sprite[] = []
let walkingImagesLeft: Image[] = []
let walkingSpeed = 0
let walkingImagesRight: Image[] = []
let dude: Sprite = null
let beesMinimumHeight = 0
let beesMaximumHeight = 0
let minimumHeightForItems = 0
let maximumHeightForItems = 0
let rockImage: Image = null
let rockSprite: Sprite = null
let distanceExploredForLevel = 0
let aLocation = 0
let rockLocations: number[][] = []
let rockLocationsLevel: number[] = []
let treeImage: Image = null
let treeSprite: Sprite = null
let testing = false
setVariables()
setFood()
setRocks()
setFires()
setClouds()
setTrees()
setEnemies()
createBackgroundSprites()
setPlayer()
defineImages()
if (testing) {
    setEgg(20)
} else {
    setEgg(scene.screenWidth() * 2)
}
placeTrees(1, 0)
game.onUpdate(function () {
    if (showingIntroduction) {
    	
    } else if (inLevel) {
        checkGroundOffScreen()
        getNextGroundPiece()
        removeDyingEnemies()
        checkEnemyPosition()
        if (!(dying)) {
            reduceEnergyOverTime()
            moveScreenElements()
            checkOnGround()
            checkPlayer()
            spawnFood()
            spawnRocks()
            spawnFires()
            spawnTrees()
            spawnClouds()
            spawnEnemies()
        }
    }
})
