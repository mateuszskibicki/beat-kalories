import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import _ from 'lodash';

import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';
import SelectForm from '../common/SelectForm';


class BurnCalories extends Component {
	constructor(props) {
		super(props);
		this.state={
			weight: '',
			errors: {}
		};
	}

	componentDidMount() {
		window.scrollTo(0,0);
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { user } = this.props.auth;
    
		let dataCalories= {};
		let weight;
		this.state.weight ==='57 kg / 125 pounds' ? weight = 1 : null;
		this.state.weight ==='70 kg / 155 pounds' ? weight = 2 : null;
		this.state.weight ==='84 kg / 185 pounds' ? weight = 3 :null;

		dataCalories = {
			gymActivities: [
				['Weight Lifting: general',	90	,112,	133],
				['Aerobics: water',	120,	149,	178],
				['Stretching, Hatha Yoga',	120,	149,	178],
				['Calisthenics: moderate',	135,	167,	200],
				['Riders: general',	150,	186,	222],
				['Aerobics: low impact',	165,	205,	244],
				['Stair Step Machine: general',	180,	223,	266],
				['Teaching aerobics',	180,	223,	266],
				['Weight Lifting: vigorous',	180,	223,	266],
				['Aerobics, Step: low impact',	210,	260,	311],
				['Aerobics: high impact',	210,	260	,311],
				['Bicycling, Stationary: moderate',	210,	260,	311],
				['Rowing, Stationary: moderate',	210,	260,	311],
				['Calisthenics: vigorous',	240,	298,	355],
				['Circuit Training: general',	240,	298,	355],
				['Rowing, Stationary: vigorous',	255,	316,	377],
				['Elliptical Trainer: general',	270,	335,	400],
				['Ski Machine: general',	285,	353,	422],
				['Aerobics, Step: high impact',	300,	372,	444],
				['Bicycling, Stationary: vigorous', 315, 391,	466]
			],
      
			outdoorActivities: [			
				['Planting seedlings, shrubs' ,120,	149,	178],
				['Raking Lawn'	,120,	149,	178],
				[ 'Sacking grass or leaves',	120,149,178],
				['Gardening: general',	135	,167,	200],
				['Mowing Lawn: push, power'	,135,	167,	200],
				['Operate Snow Blower: walking'	,135,	167,200],
				['Plant trees',	135,	167	,200],
				['Gardening: weeding',	139,	172,	205],
				['Carrying & stacking wood',	150,	186,	222],
				['Digging, spading dirt',	150	,186,	222],
				['Laying sod / crushed rock' ,150,	186,	222],
				['Mowing Lawn: push, hand',	165,	205,	244],
				['Chopping & splitting wood',	180,	223	,266],
				['Shoveling Snow: by hand',	180	,223,	266]
			],

			homeAndDailyLifeActivities: [			
				['Sleeping',	19,	23,	28],
				['Watching TV',	23,	28,	33],
				['Reading: sitting',	34,	42,	50],
				['Standing in line',	38,	47,	56],
				['Cooking',	75,	93,	111],
				['Child-care: bathing, feeding, etc',	105	,130,	155],
				['Food Shopping: with cart',	105,	130,	155],
				['Moving: unpacking',	105,	130	,155],
				['Playing w/kids: moderate effort',	120,	149,	178],
				['Heavy Cleaning: wash car, windows',	135,	167,	200],
				['Child games: hop-scotch, jacks, etc.',	150,	186,	222],
				['Playing w/kids: vigorous effort',	150,	186,	222],
				['Moving: household furniture',	180,	223,	266],
				['Moving: carrying boxes',	210	,260	,311]
			],


			homeRepair: [
				['Auto Repair',	90	,112	,133],
				['Wiring and Plumbing',	90	,112	,133],
				['Carpentry: refinish furniture',	135,	167,	200],
				['Lay or remove carpet/tile',	135,	167,	200],
				['Paint, paper, remodel: inside',	135,	167,	200],
				['Cleaning rain gutters',	150,	186,	222],
				['Hanging storm windows',	150,	186,	222],
				['Paint house: outside',	150,	186,	222],
				['Carpentry: outside',	180,	223,	266],
				['Roofing',	180,	223,	266]
			],


			occupationalActivities: [		
				['Computer Work',	41	,51,	61],
				['Light Office Work',	45	,56,	67],
				['Sitting in Meetings',	49	,60,	72],
				['Desk Work',	53	,65,	78],
				['Sitting in Class',	53	,65,	78],
				['Truck Driving: sitting',	60	,74,	89],
				['Bartending/Server',	75	,93,	111],
				['Heavy Equip. Operator',	75	,93,	111],
				['Police Officer',	75	,93,	111],
				['Theater Work',	90	,112,	133],
				['Welding',	90	,112,	133],
				['Carpentry Work',	105,	130,	155],
				['Coaching Sports',	120,	149,	178],
				['Masseur, standing',	120,	149,	178],
				['Construction, general',	165,	205,	244],
				['Coal Mining',	180,	223,	266],
				['Horse Grooming',	180,	223,	266],
				['Masonry',	210,	260,	311],
				['Forestry, general',	240,	298,	355],
				['Heavy Tools, not power',	240,	298	,355],
				['Steel Mill: general',	240,	298,	355],
				['Firefighting',	360,	446,	533]
			],

			trainingAndSportActivities: [			
				['Billiards',	75,	93,	111],
				['Bowling',	90,	112,	133],
				['Dancing: slow, waltz, foxtrot',	90,	112,	133],
				['Frisbee',	90,	112,	133],
				['Volleyball: non-competitive, general play',	90,	112	,133],
				['Water Volleyball',	90,	112	,133],
				['Archery: non-hunting',	105,	130	,155],
				['Golf: using cart'	,105,	130,	155],
				['Hang Gliding',	105,	130,	155],
				['Curling',	120,	149,	178],
				['Gymnastics: general',	120,	149,	178],
				['Horseback Riding: general',	120,	149,	178],
				['Tai Chi',	120,	149,	178],
				['Volleyball: competitive, gymnasium play',	120,	149,	178],
				['Walking: 3.5 mph (17 min/mi)',	120,	149,	178],
				['Badminton: general', 135,	167,	200],
				['Walking: 4 mph (15 min/mi)',	135,	167,	200],
				['Kayaking',	150,	186,	222],
				['Skateboarding',	150,	186,	222],
				['Snorkeling',	150,	186,	222],
				['Softball: general play',	150,	186,	222],
				['Walking: 4.5 mph (13 min/mi)',	150,	186,	222],
				['Whitewater: rafting, kayaking',	150,	186,	222],
				['Dancing: disco, ballroom, square',	165,	205,	244],
				['Golf: carrying clubs',	165,	205,	244],
				['Dancing: Fast, ballet, twist',	180,	223,	266],
				['Fencing',	180,	223,	266],
				['Hiking: cross-country',	180,	223,	266],
				['Skiing: downhill',	180,	223,	266],
				['Swimming: general',	180,	223,	266],
				['Walk/Jog: jog <10 min.',	180,	223,	266],
				['Water Skiing',	180,	223,	266],
				['Wrestling',	180,	223,	266],
				['Basketball: wheelchair',	195,	242,	289],
				['Race Walking',	195,	242,	289],
				['Ice Skating: general',	210,	260,	311],
				['Bicycling: > 20 mph',	495,	614,	733],
				['Running: 10 mph (6 min/mile)',	495,	614,	733]
			],

			trainingAndSportActivitiesPart2: [
				['Racquetball: casual, general',	210,	260,	311],
				['Rollerblade Skating',	210,	260,	311],
				['Scuba or skin diving',	210,	260,	311],
				['Sledding, luge, toboggan',	210,	260,	311],
				['Soccer: general',	210,	260,	311],
				['Tennis: general',	210,	260,	311],
				['Basketball: playing a game',	240,	298,	355],
				['Bicycling: 12-13.9 mph',	240,	298,	355],
				['Football: touch, flag, general',	240,	298,	355],
				['Hockey: field & ice',	240,	298,	355],
				['Rock Climbing: rappelling',	240,	298,	355],
				['Running: 5 mph (12 min/mile)',	240,	298,	355],
				['Running: pushing wheelchair, marathon wheeling',	240,	298,	355],
				['Skiing: cross-country',	240,	298,	355],
				['Snow Shoeing',	240,	298,	355],
				['Swimming: backstroke',	240,	298,	355],
				['Volleyball: beach',	240,	298,	355],
				['Bicycling: BMX or mountain',	255,	316,	377],
				['Boxing: sparring', 270,	335,	400],
				['Football: competitive',	270,	335,	400],
				['Orienteering',	270,	335,	400],
				['Running: 5.2 mph (11.5 min/mile)',	270,	335,	400],
				['Running: cross-country',	270,	335,	400],
				['Bicycling: 14-15.9 mph',	300,	372,	444],
				['Martial Arts: judo, karate, kickbox',	300,	372,	444],
				['Racquetball: competitive', 300,	372,	444],
				['Rope Jumping',	300,	372,	444],
				['Running: 6 mph (10 min/mile)',	300,	372,	444],
				['Swimming: breaststroke',	300,	372,	444],
				['Swimming: laps, vigorous',	300,	372,	444],
				['Swimming: treading, vigorous',	300,	372,	444],
				['Water Polo',	300,	372,	444],
				['Rock Climbing: ascending',	330,	409,	488],
				['Running: 6.7 mph (9 min/mile)',	330,	409,	488],
				['Swimming: butterfly',	330,	409,	488],
				['Swimming: crawl',	330,  409,	488],
				['Bicycling: 16-19 mph',	360,	446,	533],
				['Handball: general',	360,	446,	533],
				['Running: 7.5 mph (8 min/mile)',	375,	465,	555],
				['Running: 8.6 mph (7 min/mile)',	435,	539,	644]
			]
		};
    
		let dataTabel = '';
		if(_.isNumber(weight)) {
			dataTabel = (
				<div className="row mt-3">
        
					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Gym activities (30min)</li>
							{dataCalories.gymActivities.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>

					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Training and sport activities (30 min)</li>
							{dataCalories.trainingAndSportActivities.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>

					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Training and sport activities part 2 (30 min)</li>
							{dataCalories.trainingAndSportActivitiesPart2.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>
          
					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Outdoor activities (30 min)</li>
							{dataCalories.outdoorActivities.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>

					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Home and daily life activities (30 min)</li>
							{dataCalories.homeAndDailyLifeActivities.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>

					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Home repair (30 min)</li>
							{dataCalories.homeRepair.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>

					<div className="col-12 col-md-6 col-xl-4">
						<ul className="list-group max-500 mt-2">
							<li className="list-group-item active">Occupational activities (30 min)</li>
							{dataCalories.occupationalActivities.map(activity => (
								<li className="list-group-item" key={activity}>
									{activity[0]}: <span className="badge badge-info">{activity[weight]} kcal</span>
								</li>
							))}
						</ul>
					</div>
          
          
				</div>
			);
		}



		return (
			<div id="burn-calories">
				<div className="mt-5 mb-5 fade-in-left">
					<div className="container">

						<div className="add-container add-container-calories mb-5">
							<div className="jumbotron mt-3 mb-3">
								<div className="display-4 text-center">Burn calories <i className="fab fa-gripfire"></i></div>
							</div>
						</div>
            
						<h4 className="text-center mt-2">
              Hello {this.props.auth.user.nickcname}! I prepared for you how much calories you will burn in couple of exercises for 3 diffrent weights in <strong>30min of activity</strong>. Choose these closest to your weight.
						</h4>

						<div className="form col-12 col-md-6 m-auto">
							<SelectForm
								htmlForAndID='weight'
								label="Weight"
								name="weight"
								optionArray={[
									'57 kg / 125 pounds',
									'70 kg / 155 pounds',
									'84 kg / 185 pounds'
								]}
								value = {this.state.weight}
								onChange = {this.onChange}
							/>
						</div>
            
            
						<ReactCSSTransitionGroup
							className="container ml-0 mr-0 p-0 mt-4"
							transitionName="fade"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={300}>
							{dataTabel}
						</ReactCSSTransitionGroup>

					</div>
				</div>
			</div>
		);
	}
}

BurnCalories.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(BurnCalories);
