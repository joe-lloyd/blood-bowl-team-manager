import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '@/contexts/userContext';
import { db } from '@/services/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { League, Season } from '@/types/league';
import { TeamDataToSave } from '@/types/userData';
import { uuidv4 } from '@firebase/util';

const FormWrapper = styled.div`
  padding: 20px;
  border: 2px solid #1d3860;
  background-color: #e0f0ff;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 2px solid #1d3860;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: #1d3860;
  color: white;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 2px solid #1d3860;
`;

interface TeamSelect {
  label: string;
  value: string;
}

const LeagueForm: React.FC<{ leagueId: string }> = ({ leagueId }) => {
  const user = useUser();
  const [leagueName, setLeagueName] = useState('');
  const [description, setDescription] = useState('');
  const [seasonName, setSeasonName] = useState('Season 1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teams, setTeams] = useState<TeamSelect[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  useEffect(() => {
    if (user) {
      const fetchTeams = async () => {
        const teamsCollection = collection(db, `users/${user.uid}/teams`);
        const teamsSnapshot = await getDocs(teamsCollection);
        const teamsList = teamsSnapshot.docs
          .map((doc) => ({
            value: doc.ref.path,
            label: doc.data().teamName,
          }))
          .filter(({ label }) => !!label) as TeamSelect[];
        setTeams(teamsList);
      };

      fetchTeams();
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      console.error('User not found');
      return;
    }

    const seasonId = uuidv4();
    const newSeason: Season = {
      seasonId,
      seasonName,
      startDate,
      endDate,
      teams: selectedTeam ? [selectedTeam] : [],
      games: [],
    };

    const leagueData: League = {
      leagueId,
      leagueName,
      description,
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
      seasons: [newSeason],
    };

    try {
      await setDoc(doc(db, 'users', user.uid, 'leagues', leagueId), leagueData);
      alert('League and first season created successfully!');
    } catch (error) {
      console.error('Error creating league:', error);
    }
  };

  return (
    <FormWrapper>
      <h2>Create New League</h2>
      <form onSubmit={handleSubmit}>
        <label>
          League Name:
          <Input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <h3>First Season</h3>
        <label>
          Season Name:
          <Input
            type="text"
            value={seasonName}
            onChange={(e) => setSeasonName(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <h3>Add Teams</h3>
        <label>
          Select Existing Team:
          <Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </Select>
        </label>
        <Button type="submit">Create League</Button>
      </form>
    </FormWrapper>
  );
};

export default LeagueForm;
